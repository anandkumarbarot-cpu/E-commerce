import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder } from "../features/order/orderSlice";

const OrderHistoryPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.items || []);
    
    useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);
    
    return (
        <div>
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <p>Order #{order.id}</p>
                            <p>Total: ${order.total.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistoryPage;