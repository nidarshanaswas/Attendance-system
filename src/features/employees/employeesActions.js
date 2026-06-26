import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEmployeesApi,
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
} from "./employeesApi";

export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async ({ page, size, name }) => {
    return await getEmployeesApi(page, size, name);
  }
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (payload) => {
    return await createEmployeeApi(payload);
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, payload }) => {
    return await updateEmployeeApi(id, payload);
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id) => {
    return await deleteEmployeeApi(id);
  }
);