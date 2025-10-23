import { apiFetch } from "../lib/api";
import type { Appointment } from "../lib/types";

export const AppointmentAPI = {
  getAll: () => apiFetch<Appointment[]>("/appointments"),
  getById: (id: string) => apiFetch<Appointment>(`/appointments/${id}`),
  create: (data: Partial<Appointment>) =>
    apiFetch<Appointment>("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Appointment>) =>
    apiFetch<Appointment>(`/appointments/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiFetch<{ message: string }>(`/appointments/${id}`, { method: "DELETE" }),
};
