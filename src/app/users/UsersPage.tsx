import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "@/hooks/useUsers";
import UserList from "@/components/users/UserList";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  const { users, currentUser, fetchUsers, deleteUser, loading, error } =
    useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = () => {
    navigate("/users/create");
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      await deleteUser(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">Users</h1>
        <Button
          onClick={handleAddUser}
          className=" px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add User
        </Button>
      </div>

      {loading && <p className="text-gray-500">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <UserList
        users={users}
        currentUser={currentUser}
        onDelete={handleDelete}
        onEdit={(id: string) => navigate(`/users/edit/${id}`)}
      />
    </div>
  );
}
