import { createSlice } from "@reduxjs/toolkit";
import { clockInUser, clockOutUser, getFirstClockIn, getLastClockOut, } from "./attendanceActions";
const initialState = {
    firstClockIn: null,
    lastClockOut: null,
    status: "idle",
    error: null,
};

const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(clockInUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getFirstClockIn.fulfilled, (state, action) => {
                // console.log(action.payload, 'action.payload');

                state.status = "succeeded";
                state.firstClockIn = action.payload.clockInTime;
            })
            .addCase(clockInUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(clockOutUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getLastClockOut.fulfilled, (state, action) => {
                // console.log(action.payload, 'action.payload');

                state.status = "succeeded";
                state.lastClockOut = action.payload;
            })
            .addCase(clockOutUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default attendanceSlice.reducer;