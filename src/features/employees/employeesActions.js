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
  async (payload,  { rejectWithValue }) => {
    try {
      return await createEmployeeApi(payload);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, payload} ,{ rejectWithValue }) => {
    try{
      return await updateEmployeeApi(id, payload);
    }catch(err){
      return rejectWithValue(err);
    }
    
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id,{ rejectWithValue }) => {
    try{
      return await deleteEmployeeApi(id);
    }catch(err){
      return rejectWithValue(err);
    }
    
  }
);