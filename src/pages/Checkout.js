import React, { useEffect, useState, useRef } from "react";
import Button from "../components/Button";
import "./Checkout.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";

const Checkout = () => {
  const cashfreeRef = useRef(null); // store SDK instance

  useEffect(() => {
    (async () => {
      cashfreeRef.current = await load({ mode: "sandbox" });
    })();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    gstPrice: "0",
    shippingCost: "200",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    street: false,
    city: false,
    state: false,
    pincode: false,
  });

  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;
  const url = process.env.REACT_APP_URL;

  // Validation functions
  const validateFirstName = (firstName) => {
    if (firstName.trim().length === 0) {
      return "First name is required";
    }
    return "";
  };

  const validateLastName = (lastName) => {
    if (lastName.trim().length === 0) {
      return "Last name is required";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (email.length === 0) {
      return "Email address is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Enter a valid email address";
    }
    return "";
  };

  const validatePhone = (phone) => {
    if (phone.length === 0) {
      return "Phone number is required";
    }
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    if (!phoneRegex.test(phone)) {
      return "Phone number must be exactly 10 digits and start with 6-9";
    }
    return "";
  };

  const validateStreet = (street) => {
    if (street.trim().length === 0) {
      return "Address is required";
    }
    return "";
  };

  const validateCity = (city) => {
    if (city.trim().length === 0) {
      return "City is required";
    }
    return "";
  };

  const validateState = (state) => {
    if (state.trim().length === 0) {
      return "State is required";
    }
    return "";
  };

  const validatePincode = (pincode) => {
    if (pincode.length === 0) {
      return "Pin code is required";
    }
    const pincodeRegex = /^[1-9][0-9]{5}$/; // Indian pincode format
    if (!pincodeRegex.test(pincode)) {
      return "Enter a valid 6-digit Indian pin code";
    }
    return "";
  };

  const verifyPayment = async (orderId) => {
    console.log("Verifying payment for order ID:", orderId);
    try {
      const res = await axios.post(`${url}/api/v1/verify`, {
        orderId,
      });
      if (res.data) {
        alert("✅ Payment Verified Successfully");
      }
    } catch (err) {
      console.error("❌ Payment verification error", err);
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const firstNameError = validateFirstName(formData.firstName);
    const lastNameError = validateLastName(formData.lastName);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const streetError = validateStreet(formData.street);
    const cityError = validateCity(formData.city);
    const stateError = validateState(formData.state);
    const pincodeError = validatePincode(formData.pincode);

    setErrors({
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      phone: phoneError,
      street: streetError,
      city: cityError,
      state: stateError,
      pincode: pincodeError,
    });

    // Mark all fields as touched for validation display
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      street: true,
      city: true,
      state: true,
      pincode: true,
    });

    // If there are any validation errors, don't submit
    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      phoneError ||
      streetError ||
      cityError ||
      stateError ||
      pincodeError
    ) {
      return;
    }

    const products = cartItems.map((item) => ({
      productId: item._id,
      name: item.title,
      quantity: item.quantity,
      price: Number(item.price),
    }));

    const customer = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.street,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
    };

    const orderSummary = {
      totalPrice: Number(totalPrice),
      gstPrice: Number(formData.gstPrice),
      shippingCost: Number(formData.shippingCost),
      coupon: {
        code: null,
        discountAmount: 0,
      },
    };

    const orderData = {
      products,
      customer,
      orderSummary,
      paymentStatus: "Pending",
      deliveryStatus: "Pending",
      trackingNumber: null,
      placedAt: new Date().toISOString(),
    };

    try {
      const res = await axios.get(`${url}/api/v1/payment`);
      if (!res.data?.payment_session_id) {
        console.error("Missing payment session");
        return;
      }

      const { payment_session_id, cf_order_id } = res.data;
      console.log("this is the data ---> ", res.data);

      await cashfreeRef.current
        .checkout({
          paymentSessionId: payment_session_id,
          redirectTarget: "_modal",
        })
        .then(() => {
          verifyPayment(cf_order_id); // Use order ID directly from API response
        });
    } catch (err) {
      console.error("Payment flow error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Real-time validation only if field has been touched
    let error = "";
    if (name === "firstName") {
      error = validateFirstName(value);
    } else if (name === "lastName") {
      error = validateLastName(value);
    } else if (name === "email") {
      error = validateEmail(value);
    } else if (name === "phone") {
      error = validatePhone(value);
    } else if (name === "street") {
      error = validateStreet(value);
    } else if (name === "city") {
      error = validateCity(value);
    } else if (name === "state") {
      error = validateState(value);
    } else if (name === "pincode") {
      error = validatePincode(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return (
    <div className="rufina1">
      <div className="md:px-12 lg:px-14">
        <p className="text-3xl border-b-2 w-32 pt-5">Checkout</p>
        <div className="flex flex-col md:flex-row lg:flex-row ">
          {/* Billing Details */}
          <div className="md:w-1/2 lg:w-1/2 px-5 py-5 mt-20 mb-36">
            <p className="text-xl sm:text-2xl md:text-4xl lg:text-4xl mb-5 border-b-2">
              BILLING DETAILS
            </p>
            <form onSubmit={formSubmit}>
              <div className="flex flex-col md:flex-row gap-5 mb-5">
                <div className="flex flex-col md:w-1/2">
                  <p>
                    First Name <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="firstName"
                    className={`h-10 border ${
                      touched.firstName && errors.firstName
                        ? "border-red-500"
                        : "border-black"
                    } px-2 mb-1`}
                    onChange={handleChange}
                    required
                  />
                  {touched.firstName && (
                    <p
                      className={`text-xs mb-3 ${
                        errors.firstName ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      {errors.firstName || "First name is required"}
                    </p>
                  )}
                  {!touched.firstName && <div className="mb-3"></div>}
                </div>
                <div className="flex flex-col md:w-1/2">
                  <p>
                    Last Name <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="lastName"
                    className={`h-10 border ${
                      touched.lastName && errors.lastName
                        ? "border-red-500"
                        : "border-black"
                    } px-2 mb-1`}
                    onChange={handleChange}
                    required
                  />
                  {touched.lastName && (
                    <p
                      className={`text-xs mb-3 ${
                        errors.lastName ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      {errors.lastName || "Last name is required"}
                    </p>
                  )}
                  {!touched.lastName && <div className="mb-3"></div>}
                </div>
              </div>

              <p>
                Address <span>*</span>
              </p>
              <input
                type="text"
                name="street"
                className={`h-10 border w-full ${
                  touched.street && errors.street
                    ? "border-red-500"
                    : "border-black"
                } px-2 mb-1`}
                placeholder="Street address"
                onChange={handleChange}
                required
              />
              {touched.street && (
                <p
                  className={`text-xs mb-5 ${
                    errors.street ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  {errors.street || "Address is required"}
                </p>
              )}
              {!touched.street && <div className="mb-5"></div>}
              <input
                type="text"
                name="landmark"
                className="h-10 border w-full mb-5 border-black"
                placeholder="Landmark (optional)"
                onChange={handleChange}
              />

              <div className="mb-5">
                <p>
                  Town/City <span>*</span>
                </p>
                <input
                  type="text"
                  name="city"
                  className={`h-10 border w-full ${
                    touched.city && errors.city
                      ? "border-red-500"
                      : "border-black"
                  } px-2 mb-1`}
                  onChange={handleChange}
                  required
                />
                {touched.city && (
                  <p
                    className={`text-xs mb-3 ${
                      errors.city ? "text-red-500" : "text-gray-600"
                    }`}
                  >
                    {errors.city || "City is required"}
                  </p>
                )}
                {!touched.city && <div className="mb-3"></div>}
              </div>

              <div className="flex flex-col md:flex-row gap-5 mb-5">
                <div className="flex flex-col md:w-1/2">
                  <p>
                    State <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="state"
                    className={`h-10 border ${
                      touched.state && errors.state
                        ? "border-red-500"
                        : "border-black"
                    } px-2 mb-1`}
                    onChange={handleChange}
                    required
                  />
                  {touched.state && (
                    <p
                      className={`text-xs mb-3 ${
                        errors.state ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      {errors.state || "State is required"}
                    </p>
                  )}
                  {!touched.state && <div className="mb-3"></div>}
                </div>
                <div className="flex flex-col md:w-1/2">
                  <p>
                    PostCode/Zip <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="pincode"
                    className={`h-10 border ${
                      touched.pincode && errors.pincode
                        ? "border-red-500"
                        : "border-black"
                    } px-2 mb-1`}
                    onChange={handleChange}
                    required
                  />
                  {touched.pincode && (
                    <p
                      className={`text-xs mb-3 ${
                        errors.pincode ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      {errors.pincode ||
                        "Enter a valid 6-digit Indian pin code"}
                    </p>
                  )}
                  {!touched.pincode && <div className="mb-3"></div>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5 mb-5">
                <div className="flex flex-col md:w-1/2">
                  <p>
                    Email Address <span>*</span>
                  </p>
                  <input
                    type="email"
                    name="email"
                    className={`h-10 border ${
                      touched.email && errors.email
                        ? "border-red-500"
                        : "border-black"
                    } px-2 mb-1`}
                    onChange={handleChange}
                    required
                  />
                  {touched.email && (
                    <p
                      className={`text-xs mb-3 ${
                        errors.email ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      {errors.email || "Enter a valid email address"}
                    </p>
                  )}
                  {!touched.email && <div className="mb-3"></div>}
                </div>
                <div className="flex flex-col md:w-1/2">
                  <p>
                    Phone <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="phone"
                    className={`h-10 border ${
                      touched.phone && errors.phone
                        ? "border-red-500"
                        : "border-black"
                    } px-2 mb-1`}
                    onChange={handleChange}
                    required
                  />
                  {touched.phone && (
                    <p
                      className={`text-xs mb-3 ${
                        errors.phone ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      {errors.phone || "Phone number must be exactly 10 digits"}
                    </p>
                  )}
                  {!touched.phone && <div className="mb-3"></div>}
                </div>
              </div>

              <input type="hidden" name="gstPrice" value={formData.gstPrice} />
              <input
                type="hidden"
                name="shippingCost"
                value={formData.shippingCost}
              />

              <Button
                type="submit"
                value="PLACE ORDER"
                color="secondary-color"
                className="w-full mt-10 h-10"
              />
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-[#f2f2f2] md:w-1/2 lg:w-1/2 justify-center md:mt-40 lg:mt-40 mb-36 px-10">
            <p className="text-xl sm:text-2xl md:text-4xl lg:text-4xl py-5">
              YOUR ORDER
            </p>
            <table className="w-full">
              <thead>
                <tr>
                  <td>PRODUCT</td>
                  <td>TOTAL</td>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {item.title} x {item.quantity}
                    </td>
                    <td>₹{Number(item.price) * item.quantity}</td>
                  </tr>
                ))}
                <tr>
                  <td>Shipping</td>
                  <td>₹{formData.shippingCost}</td>
                </tr>
                <tr>
                  <td>ORDER TOTAL</td>
                  <td>₹{Number(totalPrice) + Number(formData.shippingCost)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
