import { apiFetch } from "../lib/api";
import type { Doctor } from "../lib/types";

export const DoctorAPI = {
  getAll: () => apiFetch<Doctor[]>("/doctors"),
  getById: (id: string) => apiFetch<Doctor>(`/doctors/${id}`),
  create: (data: Partial<Doctor>) =>
    apiFetch<Doctor>("/doctors", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Doctor>) =>
    apiFetch<Doctor>(`/doctors/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiFetch<{ message: string }>(`/doctors/${id}`, { method: "DELETE" }),
};
