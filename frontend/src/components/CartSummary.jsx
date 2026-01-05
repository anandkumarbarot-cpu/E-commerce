import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartSummary = () => {
    const items = useSelector((state) => state.cart.items || []);
    
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return (
        <div>
            <h3>Order Summary</h3>
            <p>Total: ${total.toFixed(2)}</p>
            <Link to="/checkout">Checkout</Link>
        </div>
    );
};

export default CartSummary;