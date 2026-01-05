import {Link} from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <Link to={`/product/${product._id}`}>View Details</Link>
        </div>
    );
};

export default ProductCard;