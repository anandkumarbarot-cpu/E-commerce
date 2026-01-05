import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../features/cart/cartSlice";

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items || []);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const handlePlaceOrder = () => {
        dispatch(placeOrder({ items, total }));
    };
    
    return (
        <div>
            <h2>Checkout</h2>
            <p>Total: ${total.toFixed(2)}</p>
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
};

export default CheckoutPage;