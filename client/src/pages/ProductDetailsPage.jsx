import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/products"
        );

        const selectedProduct = data.find(
          (item) => item._id === id
        );

        setProduct(selectedProduct);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();

    const storedReviews =
      JSON.parse(
        localStorage.getItem(`reviews_${id}`)
      ) || [];

    setReviews(storedReviews);

    const orders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    const purchased = orders.some(
      (order) =>
        order.items.some(
          (item) => item._id === id
        )
    );

    setHasPurchased(purchased);
  }, [id]);

  const addToCart = () => {
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

  const addToWishlist = () => {
    const wishlistItems =
      JSON.parse(
        localStorage.getItem("wishlistItems")
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

  const submitReview = () => {
    if (!reviewText.trim()) return;

    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    const newReview = {
      user:
        userInfo?.name || "Anonymous",
      rating,
      comment: reviewText,
    };

    const updatedReviews = [
      ...reviews,
      newReview,
    ];

    setReviews(updatedReviews);

    localStorage.setItem(
      `reviews_${id}`,
      JSON.stringify(updatedReviews)
    );

    setReviewText("");
    setRating(5);
  };

  if (!product) {
    return (
      <div className="container mt-5">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{
              maxHeight: "500px",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-md-6">
          <h1>{product.name}</h1>

          <h2 className="text-primary my-3">
            ₹{product.price}
          </h2>

          <p className="lead">
            {product.description}
          </p>

          <div className="d-grid gap-3 mt-4">
            <button
              className="btn btn-dark btn-lg"
              onClick={addToCart}
            >
              🛒 Add To Cart
            </button>

            <button
              className="btn btn-danger btn-lg"
              onClick={addToWishlist}
            >
              ❤️ Add To Wishlist
            </button>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      <h3>⭐ Reviews & Ratings</h3>

      {hasPurchased ? (
        <div className="card p-4 mb-4">
          <label className="mb-2">
            Rating
          </label>

          <select
            className="form-select mb-3"
            value={rating}
            onChange={(e) =>
              setRating(
                Number(e.target.value)
              )
            }
          >
            <option value="5">
              ⭐⭐⭐⭐⭐
            </option>
            <option value="4">
              ⭐⭐⭐⭐
            </option>
            <option value="3">
              ⭐⭐⭐
            </option>
            <option value="2">
              ⭐⭐
            </option>
            <option value="1">
              ⭐
            </option>
          </select>

          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) =>
              setReviewText(
                e.target.value
              )
            }
          />

          <button
            className="btn btn-primary"
            onClick={submitReview}
          >
            Submit Review
          </button>
        </div>
      ) : (
        <div className="alert alert-warning">
          ⚠️ Only customers who purchased
          this product can write a review.
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="alert alert-info">
          No reviews yet.
        </div>
      ) : (
        reviews.map(
          (review, index) => (
            <div
              key={index}
              className="card p-3 mb-3"
            >
              <h5>{review.user}</h5>

              <p>
                {"⭐".repeat(
                  review.rating
                )}
              </p>

              <p>
                {review.comment}
              </p>
            </div>
          )
        )
      )}
    </div>
  );
}

export default ProductDetailsPage;