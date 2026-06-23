
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clockInApi,
   clockOutApi,
    getFirstClockInApi,
    getLastClockOutApi,
    getTotalWorkedTimeApi,
    } from "./attendanceApi";

// Clock In
export const clockInUser = createAsyncThunk(
  "attendance/clockIn",
  async (payload, { rejectWithValue }) => {
    try {
      return await clockInApi(payload);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Clock Out
export const clockOutUser = createAsyncThunk(
  "attendance/clockOut",
  async (payload, { rejectWithValue }) => {
    try {
      return await clockOutApi(payload);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// First Clock In
export const getFirstClockIn = createAsyncThunk(
  "attendance/getFirstClockIn",
  async (employeeId, { rejectWithValue }) => {
    try {
      return await getFirstClockInApi(employeeId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Last Clock Out
export const getLastClockOut = createAsyncThunk(
  "attendance/getLastClockOut",
  async (employeeId, { rejectWithValue }) => {
    try {
      return await getLastClockOutApi(employeeId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getTotalWorkedTime = createAsyncThunk(
  "attendance/getTotalWorkedTime",
  async (employeeId,{rejectWithValue}) => {
    try{
      return await getTotalWorkedTimeApi(employeeId);
    }catch (err){
      return rejectWithValue(err.message);
    }
  }
);

