import api from "./axios";

export const getEmployees = () => api.get("/employees");

export const createEmployee = (data) => api.post("/employees", data)

export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export const getPresentDays = (id) => api.get(`/employees/${id}/present-days`);