import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    if (!user) return null;

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            backgroundColor: '#333',
            color: 'white',
            marginBottom: '1rem'
        }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>E-Shop</h2>
                <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
                <Link to="/orders" style={{ color: 'white', textDecoration: 'none' }}>My Orders</Link>
            </div>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
                    Cart ({items.length})
                </Link>
                <button onClick={handleLogout} style={{ padding: '5px 10px' }}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
