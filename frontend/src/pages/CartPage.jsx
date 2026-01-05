import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

const CartPage = () => {
    const items = useSelector(state => state.cart.items);

    return (
        <div>
            <h1>Your Cart</h1>
            {items.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {items.map(item => (
                        <CartItem key={item.productId} item={item} />
                    ))}
                    <CartSummary />
                </>
            )}
        </div>
    );
};

export default CartPage;