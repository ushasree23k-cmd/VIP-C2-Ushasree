function ProfilePage() {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const orders = JSON.parse(
    localStorage.getItem("orders")
  ) || [];

  return (
    <div className="container mt-5">

      <div className="card shadow p-4 mb-4">
        <h1>👤 My Profile</h1>

        <hr />

        <h4>
          Name: {userInfo?.name}
        </h4>

        <h4>
          Email: {userInfo?.email}
        </h4>
      </div>

      <div className="card shadow p-4">

        <h2 className="mb-4">
          📦 Order History
        </h2>

        {orders.length === 0 ? (
          <div className="alert alert-info">
            No orders placed yet.
          </div>
        ) : (
          orders
            .slice()
            .reverse()
            .map((order) => (
              <div
                key={order.id}
                className="card mb-4 p-3 border"
              >
                <h5>
                  Order ID: {order.id}
                </h5>

                <p>
                  <strong>Date:</strong>{" "}
                  {order.date}
                </p>

                <p>
                  <strong>Total:</strong> ₹
                  {order.totalPrice}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.address}
                </p>

                <h6>
                  Products Ordered:
                </h6>

                <ul>
                  {order.items.map(
                    (item) => (
                      <li
                        key={item._id}
                      >
                        {item.name}
                        {" - "}
                        ₹{item.price}
                        {" × "}
                        {item.quantity || 1}
                      </li>
                    )
                  )}
                </ul>

              </div>
            ))
        )}

      </div>

    </div>
  );
}

export default ProfilePage;