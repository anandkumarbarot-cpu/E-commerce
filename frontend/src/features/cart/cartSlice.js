import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const syncCart = createAsyncThunk(
    "cart/sync", async (items) => (await api.post("/cart", { items })).data);

export const removeItem = createAsyncThunk(
    "cart/remove", async (productId) => (await api.delete(`/cart/${productId}`)).data);

export const placeOrder = createAsyncThunk(
    "cart/placeOrder",
    async (orderData, { dispatch }) => {
        try {
            const response = await api.post('/orders', orderData);

            dispatch({ type: 'cart/clearCart' });
            return response.data;
        } catch (error) {
            console.error('Error placing order:', error);
            throw error;
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: JSON.parse(localStorage.getItem("cart")) || [],
        loading: false,

    },

    reducers: {
        addToCartInternal(state, action) {
            const item = state.items.find(i => i.productId === action.payload.productId);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        updateQtyInternal(state, action) {
            const item = state.items.find(i => i.productId === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        clearCart(state) {
            state.items = [];
            localStorage.removeItem("cart");
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(syncCart.fulfilled, (s, a) => {
                s.items = a.payload.items;
            })
            .addCase(removeItem.fulfilled, (s, a) => {
                s.items = a.payload.items;
                localStorage.setItem("cart", JSON.stringify(s.items));
            });
    }
});

export const { addToCartInternal, updateQtyInternal, clearCart } = cartSlice.actions;

export const addToCart = (product) => (dispatch, getState) => {
    dispatch(addToCartInternal(product));
    const { auth, cart } = getState();
    if (auth.user) {
        dispatch(syncCart(cart.items));
    }
};

export const updateQty = (payload) => (dispatch, getState) => {
    dispatch(updateQtyInternal(payload));
    const { auth, cart } = getState();
    if (auth.user) {
        dispatch(syncCart(cart.items));
    }
};

export default cartSlice.reducer;
