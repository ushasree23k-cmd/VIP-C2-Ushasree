import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList({
  searchTerm,
  category,
}) {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/products"
        );

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const cartItems =
      JSON.parse(
        localStorage.getItem("cartItems")
      ) || [];

    const itemExists = cartItems.find(
      (item) => item._id === product._id
    );

    if (!itemExists) {
      cartItems.push(product);

      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
      );

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    }
  };

  const addToWishlist = (product) => {
    const wishlistItems =
      JSON.parse(
        localStorage.getItem(
          "wishlistItems"
        )
      ) || [];

    const itemExists =
      wishlistItems.find(
        (item) => item._id === product._id
      );

    if (!itemExists) {
      wishlistItems.push(product);

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(wishlistItems)
      );

      window.dispatchEvent(
        new Event("wishlistUpdated")
      );
    }
  };

  const filteredProducts =
    products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            (
              searchTerm || ""
            ).toLowerCase()
          );

      const matchesCategory =
  category === "All"
    ? true
    : (product.category || "") === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <>
      <h2 className="text-center mb-5">
        Featured Products
      </h2>

      <div className="row g-4">

        {filteredProducts.map(
          (product) => (
            <div
              key={product._id}
              className="col-lg-4 col-md-6"
            >
              <div className="card h-100 shadow-lg border-0 product-card">

                <Link
                  to={`/product/${product._id}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{
                      height: "250px",
                      objectFit:
                        "cover",
                    }}
                  />
                </Link>

                <div className="card-body text-center">

                  <Link
                    to={`/product/${product._id}`}
                    style={{
                      textDecoration:
                        "none",
                      color: "black",
                    }}
                  >
                    <h4>
                      {product.name}
                    </h4>
                  </Link>

                  <h5 className="text-primary">
                    ₹{product.price}
                  </h5>

                  <p>
                    {
                      product.description
                    }
                  </p>

                  <span className="badge bg-secondary mb-3">
                    {
                      product.category
                    }
                  </span>

                  <div className="d-grid gap-2">

                    <button
                      className="btn btn-dark"
                      onClick={() =>
                        addToCart(
                          product
                        )
                      }
                    >
                      🛒 Add To Cart
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() =>
                        addToWishlist(
                          product
                        )
                      }
                    >
                      ❤️ Add To Wishlist
                    </button>

                  </div>

                </div>

              </div>
            </div>
          )
        )}

      </div>
    </>
  );
}

export default ProductList;