import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const placeOrder = createAsyncThunk(
    "order/place", async (data) => (await api.post("/orders", data)).data);

export const fetchOrder = createAsyncThunk(
    "order/history", async () => (await api.get("/orders")).data);

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (s) => { s.loading = true; })
            .addCase(fetchOrder.fulfilled, (s, a) => {
                s.loading = false;
                s.list = a.payload;
            })
            .addCase(fetchOrder.rejected, (s, a) => {
                s.loading = false;
                s.error = a.error.message;
            });
    }
});

export default orderSlice.reducer;
