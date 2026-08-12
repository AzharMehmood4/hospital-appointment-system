import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://hospital-appointment-system-f7qf.vercel.app/api/appointments",
});

export const getAppointments = (params = {}) => API.get("/", { params });
export const createAppointment = (payload) => API.post("/", payload);
export const deleteAppointment = (id) => API.delete(`/${id}`);
export const updateAppointmentStatus = (id, status) => API.put(`/${id}`, { status });

export default API;
