import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/appointments",
});

export const getAppointments = (params = {}) => API.get("/", { params });
export const createAppointment = (payload) => API.post("/", payload);
export const deleteAppointment = (id) => API.delete(`/${id}`);
export const updateAppointmentStatus = (id, status) => API.put(`/${id}`, { status });

export default API;
