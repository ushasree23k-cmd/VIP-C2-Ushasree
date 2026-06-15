import { useState } from "react";
import ProductList from "../components/ProductList";

function Home() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [category, setCategory] =
    useState("All");

  return (
    <>
      <div className="hero-section">
        <h1>Shop Smart. Live Better.</h1>

        <p>
          Discover Amazing Products At Great Prices
        </p>

        <div className="container mt-4">

          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="🔍 Search Products..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <div className="mt-4 d-flex flex-wrap justify-content-center gap-2">

            <button
              className={`btn ${
                category === "All"
                  ? "btn-dark"
                  : "btn-outline-dark"
              }`}
              onClick={() =>
                setCategory("All")
              }
            >
              All
            </button>

            <button
              className={`btn ${
                category === "Electronics"
                  ? "btn-dark"
                  : "btn-outline-dark"
              }`}
              onClick={() =>
                setCategory("Electronics")
              }
            >
              Electronics
            </button>

            <button
              className={`btn ${
                category === "Fashion"
                  ? "btn-dark"
                  : "btn-outline-dark"
              }`}
              onClick={() =>
                setCategory("Fashion")
              }
            >
              Fashion
            </button>

            <button
              className={`btn ${
                category === "Accessories"
                  ? "btn-dark"
                  : "btn-outline-dark"
              }`}
              onClick={() =>
                setCategory("Accessories")
              }
            >
              Accessories
            </button>

            <button
              className={`btn ${
                category === "Wearables"
                  ? "btn-dark"
                  : "btn-outline-dark"
              }`}
              onClick={() =>
                setCategory("Wearables")
              }
            >
              Wearables
            </button>

            <button
              className={`btn ${
                category === "Beauty"
                  ? "btn-dark"
                  : "btn-outline-dark"
              }`}
              onClick={() =>
                setCategory("Beauty")
              }
            >
              Beauty
            </button>

          </div>

        </div>
      </div>

      <div className="container-fluid px-5 py-5">
        <ProductList
          searchTerm={searchTerm}
          category={category}
        />
      </div>
    </>
  );
}

export default Home;