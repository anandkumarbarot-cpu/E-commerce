import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder } from "../features/order/orderSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const OrderHistoryPage = () => {
    const dispatch = useDispatch();
    const { list: orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error loading orders: {error}</div>;
    }

    return (
        <div>
            <h1>My Orders</h1>
            {!orders || orders.length === 0 ? (
                <p>No orders found. Start shopping!</p>
            ) : (
                <div>
                    {orders.map((order) => (
                        <div key={order._id} style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
                            <h3>Order #{order._id}</h3>
                            <p>Total Amount: ${order.totalAmount?.toFixed(2)}</p>
                            <p>Status: {order.Status || 'Pending'}</p>
                            <p>Date: {new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>

                            <h4>Items:</h4>
                            <ul>
                                {order.items?.map((item, index) => (
                                    <li key={index}>
                                        {item.name ? (
                                            <>
                                                <strong>{item.name}</strong> - Quantity: {item.quantity} - Price: ${item.price}
                                            </>
                                        ) : (
                                            <>
                                                Product ID: {item.productId} - Quantity: {item.quantity}
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistoryPage;