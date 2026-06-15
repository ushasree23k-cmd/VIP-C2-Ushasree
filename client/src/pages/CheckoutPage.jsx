import { useState } from "react";

function CheckoutPage() {
  const [address, setAddress] =
    useState("");

  const cartItems =
    JSON.parse(
      localStorage.getItem("cartItems")
    ) || [];

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.price *
      (item.quantity || 1),
    0
  );

  const placeOrder = () => {
    if (!address.trim()) {
      alert(
        "Please enter delivery address"
      );
      return;
    }

    const previousOrders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      totalPrice,
      address,
      date: new Date().toLocaleString(),
    };

    previousOrders.push(newOrder);

    localStorage.setItem(
      "orders",
      JSON.stringify(previousOrders)
    );

    localStorage.removeItem(
      "cartItems"
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    alert(
      "🎉 Order Placed Successfully!"
    );

    window.location.href =
      "/profile";
  };

  return (
    <div className="container mt-5">

      <h1 className="mb-4">
        💳 Checkout
      </h1>

      <div className="card p-4 shadow">

        <h3>
          Total Amount: ₹{totalPrice}
        </h3>

        <hr />

        <h5>
          Delivery Address
        </h5>

        <textarea
          className="form-control mb-3"
          rows="4"
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          placeholder="Enter your address"
        />

        <button
          className="btn btn-success"
          onClick={placeOrder}
        >
          Place Order
        </button>

      </div>

    </div>
  );
}

export default CheckoutPage;