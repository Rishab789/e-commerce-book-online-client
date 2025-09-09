import React, { useState, useEffect, useContext } from "react";
import Button from "../../src/components/Button";
import { LogInContext } from "./../contexts/LogInContext";
import {
  Package,
  Calendar,
  CreditCard,
  MapPin,
  Truck,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ShoppingBag,
  User,
  Menu,
} from "lucide-react";

const OrderAccount = () => {
  const { userId } = useContext(LogInContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [cancellingOrder, setCancellingOrder] = useState(null);
  const [cancelMessage, setCancelMessage] = useState({ type: "", text: "" });
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dummy tracking data
  const dummyTrackingData = {
    trackingId: "AWB123456789",
    status: "In Transit",
    events: [
      {
        status: "Order Placed",
        date: "2025-09-07 10:30 AM",
        location: "Mumbai, MH",
        details: "Order has been successfully placed",
      },
      {
        status: "Processing",
        date: "2025-09-07 02:15 PM",
        location: "Mumbai, MH",
        details: "Order is being processed at the warehouse",
      },
      {
        status: "Shipped",
        date: "2025-09-08 09:00 AM",
        location: "Pune, MH",
        details: "Order has been shipped from the warehouse",
      },
      {
        status: "In Transit",
        date: "2025-09-08 03:45 PM",
        location: "Nashik, MH",
        details: "Package is in transit to destination",
      },
      {
        status: "Out for Delivery",
        date: "2025-09-09 08:00 AM",
        location: "Delhi, DL",
        details: "Package is out for delivery",
      },
    ],
  };

  useEffect(() => {
    fetchUserOrders();
  }, [userId]);

  const fetchUserOrders = async () => {
    if (!userId) {
      setLoading(false);
      setError("User not logged in");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("Fetching orders for user:", userId);

      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/getUserOrders?userId=${userId}`
      );

      const data = await response.json();
      console.log("API response:", data);

      if (data.success) {
        setOrders(data.data.orders || []);
      } else {
        setError(
          "Failed to fetch orders: " + (data.message || "Unknown error")
        );
      }
    } catch (err) {
      setError("Error fetching orders. Please try again.");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (
      !window.confirm(
        "Are you sure you want to cancel this order? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setCancellingOrder(orderId);
      setCancelMessage({ type: "", text: "" });

      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/cancelOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order_id: orderId }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setCancelMessage({
          type: "success",
          text: "Order cancelled successfully!",
        });

        await fetchUserOrders();

        setTimeout(() => {
          setCancelMessage({ type: "", text: "" });
        }, 3000);
      } else {
        throw new Error(data.message || "Failed to cancel order");
      }
    } catch (err) {
      console.error("Cancel order error:", err);
      setCancelMessage({
        type: "error",
        text: err.message || "Failed to cancel order. Please try again.",
      });
    } finally {
      setCancellingOrder(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount || 0).toLocaleString("en-IN")}`;
  };

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setShowTrackingModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      NEW: {
        color: "bg-blue-50 text-blue-700 border-blue-200 shadow-blue-100",
        icon: Package,
        bgGradient: "from-blue-50 to-blue-100",
      },
      PROCESSING: {
        color: "bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100",
        icon: Clock,
        bgGradient: "from-amber-50 to-amber-100",
      },
      SHIPPED: {
        color:
          "bg-purple-50 text-purple-700 border-purple-200 shadow-purple-100",
        icon: Truck,
        bgGradient: "from-purple-50 to-purple-100",
      },
      DELIVERED: {
        color:
          "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-100",
        icon: CheckCircle,
        bgGradient: "from-emerald-50 to-emerald-100",
      },
      CANCELLED: {
        color: "bg-red-50 text-red-700 border-red-200 shadow-red-100",
        icon: XCircle,
        bgGradient: "from-red-50 to-red-100",
      },
    };

    const config =
      statusConfig[status?.toUpperCase()] || statusConfig.PROCESSING;
    const IconComponent = config.icon;

    return (
      <div
        className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border shadow-sm bg-gradient-to-r ${config.color} ${config.bgGradient}`}
      >
        <IconComponent size={14} className="flex-shrink-0 sm:w-4 sm:h-4" />
        <span className="whitespace-nowrap">{status || "Processing"}</span>
      </div>
    );
  };

  const getPaymentMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case "card":
        return <CreditCard size={16} className="text-blue-600" />;
      case "upi":
        return <CreditCard size={16} className="text-green-600" />;
      case "cod":
        return <Package size={16} className="text-orange-600" />;
      default:
        return <CreditCard size={16} className="text-gray-600" />;
    }
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-48 sm:h-56 md:h-64">
      <div className="relative">
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ShoppingBag
            size={16}
            className="text-blue-600 sm:w-5 sm:h-5 md:w-6 md:h-6"
          />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
                <ShoppingBag
                  size={24}
                  className="sm:w-7 sm:h-7 md:w-8 md:h-8"
                />
                My Orders
              </h1>
              <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base">
                Track and manage your orders
              </p>
            </div>
            <div className="p-4 sm:p-6 md:p-8">
              <LoadingSpinner />
              <p className="text-center text-gray-600 mt-4 text-sm sm:text-base md:text-lg">
                Loading your orders...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
                <ShoppingBag
                  size={24}
                  className="sm:w-7 sm:h-7 md:w-8 md:h-8"
                />
                My Orders
              </h1>
            </div>
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col items-center justify-center h-48 sm:h-56 md:h-64">
                <div className="bg-red-50 p-3 sm:p-4 rounded-full mb-4">
                  <AlertCircle
                    size={32}
                    className="text-red-500 sm:w-10 sm:h-10 md:w-12 md:h-12"
                  />
                </div>
                <p className="text-red-600 text-sm sm:text-base md:text-lg font-semibold text-center px-4">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
              <ShoppingBag size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
              My Orders
            </h1>
            <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base">
              {orders.length > 0
                ? `${orders.length} order${orders.length !== 1 ? "s" : ""}`
                : "No orders found"}
            </p>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 sm:h-56 md:h-64">
                <div className="bg-gray-50 p-4 sm:p-5 md:p-6 rounded-full mb-4 sm:mb-5 md:mb-6">
                  <Package
                    size={48}
                    className="text-gray-400 sm:w-14 sm:h-14 md:w-16 md:h-16"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 text-center">
                  No orders found
                </h3>
                <p className="text-gray-500 text-center max-w-md text-sm sm:text-base px-4">
                  You haven't placed any orders yet. Start shopping to see your
                  orders here!
                </p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-5 md:p-6">
                      <div className="flex flex-col space-y-3 sm:space-y-4">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                                Order #{order.channel_order_id || order.id}
                              </h3>
                              <div className="flex-shrink-0">
                                {getStatusBadge(order.status)}
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar size={14} className="flex-shrink-0" />
                                <span>{formatDate(order.order_date)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Package size={14} className="flex-shrink-0" />
                                <span>
                                  {order.products?.length || 0} item
                                  {(order.products?.length || 0) !== 1
                                    ? "s"
                                    : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-left md:text-right flex-shrink-0">
                            <p className="text-xl sm:text-2xl font-bold text-gray-800">
                              {formatCurrency(order.net_total)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 sm:px-5 sm:py-4 md:px-6 bg-gray-25 border-t border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-700 mb-2">
                            Products:
                          </p>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {order.products?.slice(0, 2).map((product, idx) => (
                              <span key={product.id} className="inline-block">
                                <span className="bg-blue-50 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                                  {product.name} ({product.quantity})
                                </span>
                              </span>
                            ))}
                            {(order.products?.length || 0) > 2 && (
                              <span className="bg-gray-100 text-gray-600 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                                +{order.products.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => toggleOrderDetails(order.id)}
                          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm w-full sm:w-auto mt-2 sm:mt-0"
                        >
                          {expandedOrder === order.id ? (
                            <>
                              <EyeOff size={14} className="flex-shrink-0" />
                              <span className="hidden sm:inline">
                                Hide Details
                              </span>
                              <span className="sm:hidden">Hide</span>
                              <ChevronUp size={14} className="flex-shrink-0" />
                            </>
                          ) : (
                            <>
                              <Eye size={14} className="flex-shrink-0" />
                              <span className="hidden sm:inline">
                                View Details
                              </span>
                              <span className="sm:hidden">Details</span>
                              <ChevronDown
                                size={14}
                                className="flex-shrink-0"
                              />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    {expandedOrder === order.id && (
                      <div className="border-t border-gray-100 bg-white">
                        <div className="p-4 sm:p-5 md:p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                            <div className="lg:col-span-2">
                              <div className="bg-gray-50 rounded-xl p-4 sm:p-5 md:p-6">
                                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                  <Package
                                    size={18}
                                    className="sm:w-5 sm:h-5"
                                  />
                                  Products
                                </h3>
                                <div className="space-y-3 sm:space-y-4">
                                  {order.products?.map((product) => (
                                    <div
                                      key={product.id}
                                      className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100"
                                    >
                                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                        <div className="flex-1 min-w-0">
                                          <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                                            {product.name}
                                          </h4>
                                          <div className="space-y-1">
                                            <p className="text-xs sm:text-sm text-gray-600">
                                              SKU: {product.sku}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                                Qty: {product.quantity}
                                              </span>
                                              <span className="text-xs sm:text-sm text-gray-600">
                                                {formatCurrency(
                                                  product.selling_price
                                                )}{" "}
                                                each
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="text-left sm:text-right flex-shrink-0">
                                          <p className="text-base sm:text-lg font-bold text-gray-800">
                                            {formatCurrency(product.net_total)}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="flex justify-between items-center mt-4 sm:mt-6 pt-3 sm:pt-4 border-t-2 border-gray-200">
                                  <span className="text-base sm:text-lg font-bold text-gray-800">
                                    Order Total
                                  </span>
                                  <span className="text-lg sm:text-2xl font-bold text-blue-600">
                                    {formatCurrency(order.net_total)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4 sm:space-y-6">
                              <div className="bg-blue-50 rounded-xl p-4 sm:p-5 md:p-6">
                                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                  <MapPin size={18} className="sm:w-5 sm:h-5" />
                                  Shipping Details
                                </h3>
                                <div className="space-y-3 sm:space-y-4">
                                  <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-1">
                                      Delivery Address
                                    </p>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                      {order.customer_address}
                                      <br />
                                      {order.customer_city},{" "}
                                      {order.customer_state}
                                      <br />
                                      PIN: {order.customer_pincode}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-1">
                                      Estimated Delivery
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {order.sla || "Not specified"}
                                    </p>
                                  </div>
                                  {order.shipments && (
                                    <div>
                                      <p className="text-sm font-semibold text-gray-700 mb-1">
                                        Shipment Status
                                      </p>
                                      <p className="text-sm text-gray-600 capitalize">
                                        {order.shipments.status}
                                      </p>
                                      {order.shipments.awb && (
                                        <p className="text-sm text-gray-600 mt-1 break-all">
                                          <span className="font-medium">
                                            Tracking ID:
                                          </span>{" "}
                                          {order.shipments.awb}
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="bg-green-50 rounded-xl p-4 sm:p-5 md:p-6">
                                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                  <CreditCard
                                    size={18}
                                    className="sm:w-5 sm:h-5"
                                  />
                                  Payment Details
                                </h3>
                                <div className="flex items-center gap-3">
                                  {getPaymentMethodIcon(order.payment_method)}
                                  <div>
                                    <p className="text-sm font-semibold text-gray-700">
                                      Payment Method
                                    </p>
                                    <p className="text-sm text-gray-600 capitalize">
                                      {order.payment_method === "cod"
                                        ? "Cash on Delivery"
                                        : order.payment_method === "upi"
                                        ? "UPI Payment"
                                        : order.payment_method === "card"
                                        ? "Card Payment"
                                        : order.payment_method}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <Button
                                  onClick={() => handleTrackOrder(order)}
                                  value="Track Order"
                                  color="primary"
                                  className="w-full px-4 py-3 text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                />
                                <Button
                                  onClick={() => handleCancelOrder(order.id)}
                                  value="Cancel Order"
                                  color="secondary"
                                  className="w-full px-4 py-3 text-sm font-semibold rounded-xl border-2 hover:border-gray-400 transition-all"
                                  disabled={
                                    order.status === "CANCELLED" ||
                                    order.status === "DELIVERED"
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tracking Modal */}
      {showTrackingModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Truck size={24} />
                  Track Order #
                  {selectedOrder.channel_order_id || selectedOrder.id}
                </h2>
                <button
                  onClick={() => setShowTrackingModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Tracking ID and Status */}
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Tracking ID
                  </p>
                  <p className="text-sm text-gray-600">
                    {dummyTrackingData.trackingId}
                  </p>
                  <p className="text-sm font-semibold text-gray-700 mt-3">
                    Current Status
                  </p>
                  {getStatusBadge(dummyTrackingData.status)}
                </div>

                {/* Tracking Timeline */}
                <div>
                  <h3 className="text-base font-bold text-gray-800 mb-4">
                    Tracking History
                  </h3>
                  <div className="relative border-l-2 border-blue-200 pl-6">
                    {dummyTrackingData.events.map((event, index) => (
                      <div key={index} className="mb-6 relative">
                        <div className="absolute -left-8 top-0 bg-blue-600 rounded-full w-4 h-4"></div>
                        <p className="text-sm font-semibold text-gray-800">
                          {event.status}
                        </p>
                        <p className="text-xs text-gray-600">{event.date}</p>
                        <p className="text-xs text-gray-600">
                          {event.location}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {event.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <Button
                  onClick={() => setShowTrackingModal(false)}
                  value="Close"
                  color="secondary"
                  className="w-full px-4 py-3 text-sm font-semibold rounded-xl border-2 hover:border-gray-400 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderAccount;
