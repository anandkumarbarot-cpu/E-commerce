import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../features/cart/cartSlice";

const CartSummary = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state) => state.cart.items || []);

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handlePlaceOrder = async () => {
        try {
            await dispatch(placeOrder({
                items: items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                })),
                totalAmount: total
            })).unwrap();

            navigate('/orders');
        } catch (error) {
            alert('Failed to place order: ' + error.message);
        }
    };

    return (
        <div>
            <h3>Order Summary</h3>
            <p>Total: ${total.toFixed(2)}</p>
            <button onClick={handlePlaceOrder} disabled={items.length === 0}>
                Place Order
            </button>
        </div>
    );
};

export default CartSummary;