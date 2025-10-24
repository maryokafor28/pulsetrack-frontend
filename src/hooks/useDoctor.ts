// src/hooks/useDoctors.ts
import { useState, useEffect, useCallback } from "react";
import { DoctorAPI } from "@/services/doctorApi";
import type { Doctor } from "@/lib/types";

const STORAGE_KEY = "doctors_cache";

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncLocal = (data: Doctor[]) => {
    setDoctors(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  /** 🔹 Fetch all doctors */
  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DoctorAPI.getAll();
      syncLocal(data);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to fetch doctors";
      setError(msg);
      console.error("Fetch doctors error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔹 Create new doctor */
  const createDoctor = useCallback(
    async (newData: Partial<Doctor>) => {
      try {
        setLoading(true);
        const created = await DoctorAPI.create(newData);
        syncLocal([...doctors, created]);
      } catch (err) {
        console.error("Create doctor error:", err);
        setError("Failed to create doctor");
      } finally {
        setLoading(false);
      }
    },
    [doctors]
  );

  /** 🔹 Update existing doctor */
  const updateDoctor = useCallback(
    async (id: string, data: Partial<Doctor>) => {
      try {
        setLoading(true);
        const updatedDoctor = await DoctorAPI.update(id, data);
        const updatedList = doctors.map((doc) =>
          doc._id === id ? updatedDoctor : doc
        );
        syncLocal(updatedList);
      } catch (err) {
        console.error("Update doctor error:", err);
        setError("Failed to update doctor");
      } finally {
        setLoading(false);
      }
    },
    [doctors]
  );

  /** 🔹 Delete doctor */
  const deleteDoctor = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        await DoctorAPI.delete(id);
        const filtered = doctors.filter((doc) => doc._id !== id);
        syncLocal(filtered);
      } catch (err) {
        console.error("Delete doctor error:", err);
        setError("Failed to delete doctor");
      } finally {
        setLoading(false);
      }
    },
    [doctors]
  );

  /** 🔹 Get doctor by ID */
  const getDoctorById = useCallback(
    async (id: string): Promise<Doctor | null> => {
      try {
        const found = doctors.find((doc) => doc._id === id);
        if (found) return found;
        const fetched = await DoctorAPI.getById(id);
        return fetched;
      } catch (err) {
        console.error("Get doctor by ID error:", err);
        setError("Failed to get doctor");
        return null;
      }
    },
    [doctors]
  );

  /** 🔹 Fetch on mount if no cached doctors */
  useEffect(() => {
    if (doctors.length === 0) fetchDoctors();
  }, [fetchDoctors]);

  return {
    doctors,
    loading,
    error,
    fetchDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorById,
  };
}
