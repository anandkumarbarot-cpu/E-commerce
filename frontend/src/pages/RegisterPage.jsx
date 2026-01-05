import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(s => s.auth);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            await dispatch(registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password
            })).unwrap();
            navigate("/products", { replace: true });
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    return (
        <div>
            <div>
                <div>
                    <h2>Create a new account</h2>
                    <p>
                        Or{' '}
                        <Link to="/login">
                            sign in to your account
                        </Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor="name">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {formErrors.name && (
                                <p style={{ color: 'red' }}>{formErrors.name}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {formErrors.email && (
                                <p style={{ color: 'red' }}>{formErrors.email}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {formErrors.password && (
                                <p style={{ color: 'red' }}>{formErrors.password}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {formErrors.confirmPassword && (
                                <p style={{ color: 'red' }}>{formErrors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div style={{ color: 'red' }}>
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}