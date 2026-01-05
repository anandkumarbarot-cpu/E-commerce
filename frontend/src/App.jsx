import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./features/auth/authSlice";
import { syncCart } from "./features/cart/cartSlice";
import ProtectedRoute from "./components/ProtectedRoute";

import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrderHistoryPage = lazy(() => import("./pages/OrderHistoryPage"));

export default function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      dispatch(getUserProfile())
        .unwrap()
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      // Sync local cart to backend on login
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      if (localCart.length > 0) {
        dispatch(syncCart(localCart));
      }
    }
  }, [user, dispatch]);

  if (loading && localStorage.getItem('token')) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={
              user ? <Navigate to="/products" replace /> : <LoginPage />
            } />
            <Route path="/register" element={
              user ? <Navigate to="/products" replace /> : <RegisterPage />
            } />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderHistoryPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
