import { useEffect, useState } from "react";

function WishlistPage() {
  const [wishlistItems, setWishlistItems] =
    useState([]);

  useEffect(() => {
    const items =
      JSON.parse(
        localStorage.getItem(
          "wishlistItems"
        )
      ) || [];

    setWishlistItems(items);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist =
      wishlistItems.filter(
        (item) => item._id !== id
      );

    setWishlistItems(updatedWishlist);

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(updatedWishlist)
    );
  };

  return (
    <div className="container mt-5">

      <h1 className="mb-4">
        ❤️ My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="alert alert-info">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="row">

          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="col-md-6 mb-4"
            >
              <div className="card shadow-sm">

                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body">

                  <h4>{item.name}</h4>

                  <h5 className="text-primary">
                    ₹{item.price}
                  </h5>

                  <p>
                    {item.description}
                  </p>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      removeFromWishlist(
                        item._id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default WishlistPage;