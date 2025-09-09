import React, { useState, useEffect, useContext } from "react";
import Button from "../../src/components/Button";
import { LogInContext } from "./../contexts/LogInContext"; // Import the context

const OrderAccount = () => {
  const { userId } = useContext(LogInContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/getUserOrders?userId=${userId}`
        );

        const data = await response.json();

        if (data.success) {
          setOrders(data.data.orders);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (err) {
        setError("Error fetching orders. Please try again.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    return `₹${price?.toLocaleString("en-IN")}/-` || "₹0/-";
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "processing":
      case "confirmed":
        return "bg-orange-400";
      case "shipped":
        return "bg-blue-400";
      case "delivered":
        return "bg-green-400";
      case "cancelled":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="overflow-auto">
        <p className="text-2xl border-b-2 mb-5">Orders</p>
        <div className="flex justify-center items-center h-40">
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-auto">
        <p className="text-2xl border-b-2 mb-5">Orders</p>
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <p className="text-2xl border-b-2 mb-5">Orders</p>

      {orders.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Products</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.order_id || index} className="hover:bg-gray-50">
                  <td className="p-3 border">
                    #{order.order_id || order.id || "N/A"}
                  </td>
                  <td className="p-3 border">
                    {order.order_items?.map((item) => item.name).join(", ") ||
                      "Unknown Product"}
                  </td>
                  <td className="p-3 border">
                    {formatDate(order.order_date || order.created_at)}
                  </td>
                  <td className="p-3 border">
                    <p
                      className={`rounded-md text-white px-2 py-1 text-sm ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status || "Unknown"}
                    </p>
                  </td>
                  <td className="p-3 border">
                    {formatPrice(order.order_amount || order.total)}
                  </td>
                  <td className="p-3 border">
                    {order.status !== "cancelled" &&
                      order.status !== "delivered" && (
                        <Button
                          value="Cancel"
                          color="sign-color"
                          className="text-sm px-3 py-1"
                          onClick={() => handleCancelOrder(order.order_id)}
                        />
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Optional: Add cancel order function
const handleCancelOrder = async (orderId) => {
  if (window.confirm("Are you sure you want to cancel this order?")) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/cancelOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Order cancelled successfully");
        // Refresh orders
        window.location.reload();
      } else {
        alert("Failed to cancel order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Error cancelling order");
    }
  }
};

export default OrderAccount;
