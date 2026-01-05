import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetailPage = () => {
    const { id } = useParams();
    
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.find((p) => p._id === id));
    
    
    if (!product) {
        return <div>Product not found</div>;
    }
    
    return (
        <div>
            <h1>{product.name}</h1>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </div>
    );
};

export default ProductDetailPage;