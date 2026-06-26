// import { createSlice } from "@reduxjs/toolkit";
// import { getEmployees, createEmployee, updateEmployee, deleteEmployee,
// } from "./employeesActions";

// const initialState = {
//   employees: [],
//   currentPage: 1,
//   totalPages: 1,
//   totalEmployees: 0,
//   loading: false,
//   error: null,
// };

// const employeesSlice = createSlice({
//   name: "employees",
//   initialState,
//   reducers: {},

//   extraReducers: (builder) => {
//     builder

//       .addCase(getEmployees.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getEmployees.fulfilled, (state, action) => {
//         state.loading = false;
//         state.employees = action.payload.employees;
//         state.totalPages = action.payload.totalPages;
//         state.totalEmployees =
//           action.payload.totalEmployees;
//       })
//       .addCase(getEmployees.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       .addCase(createEmployee.fulfilled, (state) => {})

//       .addCase(updateEmployee.fulfilled, (state) => {})

//       .addCase(deleteEmployee.fulfilled, (state) => {});
//   },
// });

// export default employeesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./employeesActions";

const initialState = {
  employees: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalEmployees: 0,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
      })

      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees =
          action.payload.employees || [];

        state.currentPage =
          action.payload.currentPage || 1;

        state.totalPages =
          action.payload.totalPages || 1;

        state.totalEmployees =
          action.payload.totalEmployees || 0;
      })

      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
      })

      .addCase(createEmployee.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateEmployee.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteEmployee.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeesSlice.reducer;