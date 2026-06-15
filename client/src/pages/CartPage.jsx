import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items =
      JSON.parse(
        localStorage.getItem("cartItems")
      ) || [];

    const itemsWithQuantity = items.map(
      (item) => ({
        ...item,
        quantity: item.quantity || 1,
      })
    );

    setCartItems(itemsWithQuantity);
  }, []);

  const updateCartStorage = (items) => {
    setCartItems(items);

    localStorage.setItem(
      "cartItems",
      JSON.stringify(items)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map(
      (item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
    );

    updateCartStorage(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map(
      (item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
    );

    updateCartStorage(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart =
      cartItems.filter(
        (item) => item._id !== id
      );

    updateCartStorage(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">

      <h1 className="mb-4">
        🛒 Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="row">

            {cartItems.map((item) => (
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
                      objectFit: "cover",
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

                    <div className="d-flex align-items-center gap-2 mb-3">

                      <button
                        className="btn btn-outline-danger"
                        onClick={() =>
                          decreaseQuantity(
                            item._id
                          )
                        }
                      >
                        ➖
                      </button>

                      <span className="fw-bold">
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-success"
                        onClick={() =>
                          increaseQuantity(
                            item._id
                          )
                        }
                      >
                        ➕
                      </button>

                    </div>

                    <p>
                      <strong>
                        Subtotal:
                      </strong>{" "}
                      ₹
                      {item.price *
                        item.quantity}
                    </p>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        removeFromCart(
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

          <div className="card p-4 mt-4 shadow">

            <h3>
              Total: ₹{totalPrice}
            </h3>

            <button
              className="btn btn-success mt-3"
              onClick={() =>
                navigate("/checkout")
              }
            >
              Proceed To Checkout
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default CartPage;