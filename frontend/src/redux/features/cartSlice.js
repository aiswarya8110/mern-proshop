import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : ( 
{
    cartItems: [],
    shippingAddress: null,
    paymentMethod: 'PayPal',
}
);

const addDecimals = (num)=>{
    return (Math.round(num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart : (state, action)=>{
            const item = action.payload;

            const existingItem = state.cartItems.find((x)=> x._id === item._id);

            if(existingItem){
                state.cartItems = state.cartItems.map((x)=>{
                    return x._id === existingItem._id ? item : x 
                })
            }
            else{
                state.cartItems = [...state.cartItems, item];
            }

            // Calculate items price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item)=> acc + item.price * item.qty, 0));

            // Calculate shipping price (If order is over $100 then free, else $10 shipping)
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            // Calculate tax price(15% tax)
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

            // Calculate total price
            state.totalPrice = (
                Number(state.itemsPrice) + 
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);

            localStorage.setItem("cart", JSON.stringify(state));
        },
        deleteCartItem: (state, action)=>{
            const item = action.payload;
            state.cartItems = state.cartItems.filter((x)=> x._id !== item._id);

            localStorage.setItem("cart", JSON.stringify(state));
        },
        saveShippingAddress: (state, action)=>{
            state.shippingAddress = action.payload;

            localStorage.setItem("cart", JSON.stringify(state));
        },
        savePaymentMethod: (state, action)=>{
            state.paymentMethod = action.payload;

            localStorage.setItem("cart", JSON.stringify(state));
        },
        clearCartItems: (state, _ )=>{
            state.cartItems = [];
            state.shippingAddress = null;
            state.paymentMethod = "PayPal";
            localStorage.setItem("cart", JSON.stringify(state));
        }
    }
});

export const { addToCart, deleteCartItem, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;