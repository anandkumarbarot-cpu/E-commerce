import { useDispatch } from "react-redux";
import { updateQty, removeItem } from "../features/cart/cartSlice";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    
    const handleQtyChange = (e) => {
        const qty = Number(e.target.value);
        if (!Number.isNaN(qty) && qty > 0) {
            dispatch(updateQty({ id: item.productId, quantity: qty }));
        }
    };
    
    return (
        <div>
            <span>Product: {item.productId}</span>
            <h4>Item: {item.name}</h4>
            <p>Price: ${item.price}</p>
            <p>Total: ${parseFloat(item.price * item.quantity).toFixed(2)}</p>
            <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={handleQtyChange}
            />
            <button onClick={() => dispatch(removeItem(item.productId))}>Remove</button>
        </div>
    );
};

export default CartItem;