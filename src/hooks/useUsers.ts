import { useEffect, useState, useCallback } from "react";
import { UserAPI } from "@/api/userApi";
import type { User, UseUsersReturn } from "@/lib/types";

const LOCAL_USER_KEY = "pulse_user";

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load currentUser from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(LOCAL_USER_KEY);
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse saved user:", err);
        localStorage.removeItem(LOCAL_USER_KEY);
      }
    }
  }, []);

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await UserAPI.getAll();
      setUsers(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch users";
      setError(message);
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  }, []); // ✅ Add empty dependency array

  // Fetch a single user by ID
  const getUserById = useCallback(async (id: string): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);
      const user = await UserAPI.getById(id);
      return user;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load user";
      setError(message);
      console.error("Fetch user by ID error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // ✅ Add this dependency array

  // Create a new user
  const createUser = async (data: Partial<User>): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await UserAPI.create(data);

      // Update state
      setUsers((prev) => [...prev, newUser]);

      // Save to localStorage and set as current user
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
      setCurrentUser(newUser);

      return newUser;
    } catch (err) {
      let message = "Failed to create user";

      // Check for duplicate email error
      if (err instanceof Error) {
        // Handle common API error responses for duplicate email
        if (
          err.message.toLowerCase().includes("email") &&
          (err.message.toLowerCase().includes("already") ||
            err.message.toLowerCase().includes("exists") ||
            err.message.toLowerCase().includes("duplicate"))
        ) {
          message =
            "Email already exists. Please use a different email address.";
        } else if (
          err.message.includes("E11000") ||
          err.message.includes("duplicate key")
        ) {
          // MongoDB duplicate key error
          message =
            "Email already exists. Please use a different email address.";
        } else {
          message = err.message;
        }
      }

      setError(message);
      console.error("Create user error:", err);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Update user (only self)
  const updateUser = async (
    id: string,
    data: Partial<User>
  ): Promise<User | void> => {
    if (!currentUser || currentUser._id !== id) {
      const errorMsg = "You can only edit your own profile";
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      setLoading(true);
      setError(null);
      const updatedUser = await UserAPI.update(id, data);

      // Update users list
      setUsers((prev) => prev.map((u) => (u._id === id ? updatedUser : u)));

      // Update localStorage and current user
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      return updatedUser;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update user";
      setError(message);
      console.error("Update user error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete user (only self)
  const deleteUser = async (id: string): Promise<void> => {
    if (!currentUser || currentUser._id !== id) {
      const errorMsg = "You can only delete your own account";
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      setLoading(true);
      setError(null);
      await UserAPI.delete(id);

      // Remove from users list
      setUsers((prev) => prev.filter((u) => u._id !== id));

      // Clear localStorage and current user
      localStorage.removeItem(LOCAL_USER_KEY);
      setCurrentUser(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete user";
      setError(message);
      console.error("Delete user error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    currentUser,
    loading,
    error,
    fetchUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
}
