import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { useState, useEffect } from "react";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";

import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

function App() {
  const [cartCount, setCartCount] =
    useState(0);

  const [wishlistCount, setWishlistCount] =
    useState(0);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(
        JSON.parse(
          localStorage.getItem("cartItems")
        )?.length || 0
      );

      setWishlistCount(
        JSON.parse(
          localStorage.getItem(
            "wishlistItems"
          )
        )?.length || 0
      );
    };

    updateCounts();

    window.addEventListener(
      "cartUpdated",
      updateCounts
    );

    window.addEventListener(
      "wishlistUpdated",
      updateCounts
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCounts
      );

      window.removeEventListener(
        "wishlistUpdated",
        updateCounts
      );
    };
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");

    window.location.href = "/";
  };

  return (
    <BrowserRouter>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid px-5">

          <Link
            className="navbar-brand"
            to="/"
          >
            SHOPEZ
          </Link>

          <div>

            <Link
              className="btn btn-outline-light me-2"
              to="/"
            >
              Home
            </Link>

            {!userInfo ? (
              <>
                <Link
                  className="btn btn-outline-light me-2"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="btn btn-warning"
                  to="/register"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-outline-light me-2"
                  to="/wishlist"
                >
                  ❤️ Wishlist ({wishlistCount})
                </Link>

                <Link
                  className="btn btn-outline-light me-2"
                  to="/cart"
                >
                  🛒 Cart ({cartCount})
                </Link>

                <Link
                  className="btn btn-outline-info me-2"
                  to="/profile"
                >
                  👤 {userInfo.name}
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      </nav>

      {userInfo && (
        <div className="container mt-4">
          <div className="alert alert-success text-center">

            👋 Welcome Back,

            <strong>
              {" "}
              {userInfo.name}
            </strong>

            ! Happy Shopping at Shopez 🛍️

          </div>
        </div>
      )}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetailsPage />}
        />

        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <WishlistPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;