import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState("verifying");
  const location = useLocation();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL;

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.post(`${url}/api/v1/verify`, { orderId });

        if (res.data.success) {
          setPaymentStatus("success");
          // Here you would typically save the order to your database
        } else {
          setPaymentStatus("failed");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setPaymentStatus("error");
      }
    };

    if (orderId) {
      verifyPayment();
    } else {
      setPaymentStatus("invalid");
    }
  }, [orderId, url]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {paymentStatus === "verifying" && (
          <>
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <h2 className="text-2xl font-bold mt-4">Verifying Payment</h2>
              <p className="text-gray-600 mt-2">
                Please wait while we verify your payment...
              </p>
            </div>
          </>
        )}

        {paymentStatus === "success" && (
          <>
            <div className="text-center text-green-500">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <h2 className="text-2xl font-bold mt-4">Payment Successful!</h2>
              <p className="text-gray-600 mt-2">
                Thank you for your order. Your payment has been processed
                successfully.
              </p>
              <p className="text-sm mt-4">Order ID: {orderId}</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Continue Shopping
            </button>
          </>
        )}

        {paymentStatus === "failed" && (
          <>
            <div className="text-center text-red-500">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              <h2 className="text-2xl font-bold mt-4">Payment Failed</h2>
              <p className="text-gray-600 mt-2">
                Your payment could not be processed. Please try again.
              </p>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
