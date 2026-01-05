import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProduct } from "../features/product/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selected: product, loading, error } = useSelector((state) => state.products);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [dispatch, id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({
                productId: product._id,
                quantity,
                name: product.name,
                price: product.price
            }));
            alert(`Added ${quantity} ${product.name}(s) to cart!`);
            navigate('/cart');
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Rating: {product.rating} / 5</p>
            <p>Stock: {product.stock} available</p>

            <div>
                <label>Quantity: </label>
                <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </div>

            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductDetailPage;