import React, { useEffect, useState, useRef, useContext } from "react";
import Button from "../components/Button";
import "./Checkout.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { LogInContext } from "../contexts/LogInContext";

const Checkout = () => {
  const cashfreeRef = useRef(null);
  const { userId } = useContext(LogInContext);
  const url = process.env.REACT_APP_URL;
  const navigate = useNavigate();

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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;

  // ✅ Load Cashfree
  useEffect(() => {
    (async () => {
      cashfreeRef.current = await load({ mode: "production" });
    })();
  }, []);

  // ✅ Fetch default address from DB
  useEffect(() => {
    const fetchDefaultAddress = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`${url}/api/v1/getAddresses/${userId}`);
        const addresses = res.data?.addresses || [];
        const defaultAddress = addresses.find((addr) => addr.isDefault);

        if (defaultAddress) {
          setFormData((prev) => ({
            ...prev,
            firstName: defaultAddress.firstName || "",
            lastName: defaultAddress.lastName || "",
            email: defaultAddress.email || "",
            phone: defaultAddress.phone || "",
            street: defaultAddress.address.street || "",
            landmark: defaultAddress.address.landmark || "",
            city: defaultAddress.address.city || "",
            state: defaultAddress.address.state || "",
            pincode: defaultAddress.address.pincode || "",
          }));
        }
      } catch (err) {
        console.error("Error fetching default address:", err);
      }
    };

    fetchDefaultAddress();
  }, [userId, url]);

  // ✅ Clear form if user logs out
  useEffect(() => {
    if (!userId) {
      setFormData({
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
    }
  }, [userId]);

  // ---------------- VALIDATIONS ----------------
  const validateFirstName = (val) =>
    !val.trim() ? "First name is required" : "";
  const validateLastName = (val) =>
    !val.trim() ? "Last name is required" : "";
  const validateEmail = (val) =>
    !val
      ? "Email is required"
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
      ? ""
      : "Enter a valid email address";
  const validatePhone = (val) =>
    /^[6-9]\d{9}$/.test(val) ? "" : "Phone must be 10 digits starting with 6-9";
  const validateStreet = (val) =>
    !val.trim() ? "Street address is required" : "";
  const validateCity = (val) => (!val.trim() ? "City is required" : "");
  const validateState = (val) => (!val.trim() ? "State is required" : "");
  const validatePincode = (val) =>
    /^[1-9][0-9]{5}$/.test(val) ? "" : "Enter a valid 6-digit pin code";

  // ---------------- PAYMENT ----------------
  // const verifyPayment = async (orderId) => {
  //   try {
  //     const res = await axios.post(`${url}/api/v1/verify`, { orderId });
  //     if (res.data) alert("✅ Payment Verified Successfully");
  //   } catch (err) {
  //     console.error("❌ Payment verification error", err);
  //   }
  // };

  const formSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const firstNameError = validateFirstName(formData.firstName);
    const lastNameError = validateLastName(formData.lastName);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const streetError = validateStreet(formData.street);
    const cityError = validateCity(formData.city);
    const stateError = validateState(formData.state);
    const pincodeError = validatePincode(formData.pincode);

    const newErrors = {
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      phone: phoneError,
      street: streetError,
      city: cityError,
      state: stateError,
      pincode: pincodeError,
    };

    setErrors(newErrors);
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

    if (Object.values(newErrors).some((err) => err)) return;

    // Prepare order data
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
      coupon: { code: null, discountAmount: 0 },
    };

    const orderData = {
      products,
      customer,
      orderSummary,
      paymentStatus: "Pending",
      deliveryStatus: "Pending",
      placedAt: new Date().toISOString(),
    };

    try {
      const res = await axios.get(`${url}/api/v1/payment`);
      if (!res.data?.payment_session_id) {
        console.error("Missing payment session");
        return;
      }

      const { payment_session_id, order_id } = res.data;
      await cashfreeRef.current
        .checkout({
          paymentSessionId: payment_session_id,
          redirectTarget: "_modal",
        })
        .then(() => {
          // verifyPayment(order_id)
          navigate(`/payment-success?${order_id}`);
        });
    } catch (err) {
      console.error("Payment flow error:", err);
    }
  };

  // ---------------- INPUT HANDLER ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    let error = "";
    if (name === "firstName") error = validateFirstName(value);
    if (name === "lastName") error = validateLastName(value);
    if (name === "email") error = validateEmail(value);
    if (name === "phone") error = validatePhone(value);
    if (name === "street") error = validateStreet(value);
    if (name === "city") error = validateCity(value);
    if (name === "state") error = validateState(value);
    if (name === "pincode") error = validatePincode(value);

    setErrors((prev) => ({ ...prev, [name]: error }));
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
              {/* First Name + Last Name */}
              <div className="flex flex-col md:flex-row gap-5 mb-5">
                <div className="flex flex-col md:w-1/2">
                  <p>
                    First Name <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    className={`h-10 border ${
                      touched.firstName && errors.firstName
                        ? "border-red-500"
                        : "border-black"
                    } px-2 mb-1`}
                    onChange={handleChange}
                    required
                  />
                  {touched.firstName && (
                    <p className="text-xs mb-3 text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:w-1/2">
                  <p>
                    Last Name <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    className={`h-10 border ${
                      touched.lastName && errors.lastName
                        ? "border-red-500"
                        : "border-black"
                    } px-2 mb-1`}
                    onChange={handleChange}
                    required
                  />
                  {touched.lastName && (
                    <p className="text-xs mb-3 text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <p>
                Address <span>*</span>
              </p>
              <input
                type="text"
                name="street"
                value={formData.street}
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
                <p className="text-xs mb-5 text-red-500">{errors.street}</p>
              )}

              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                className="h-10 border w-full mb-5 border-black"
                placeholder="Landmark (optional)"
                onChange={handleChange}
              />

              {/* City + State + Pincode */}
              <div className="mb-5">
                <p>
                  Town/City <span>*</span>
                </p>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  className={`h-10 border w-full ${
                    touched.city && errors.city
                      ? "border-red-500"
                      : "border-black"
                  } px-2 mb-1`}
                  onChange={handleChange}
                  required
                />
                {touched.city && (
                  <p className="text-xs mb-3 text-red-500">{errors.city}</p>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-5 mb-5">
                <div className="flex flex-col md:w-1/2">
                  <p>
                    State <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    className={`h-10 border ${
                      touched.state && errors.state
                        ? "border-red-500"
                        : "border-black"
                    } px-2 mb-1`}
                    onChange={handleChange}
                    required
                  />
                  {touched.state && (
                    <p className="text-xs mb-3 text-red-500">{errors.state}</p>
                  )}
                </div>
                <div className="flex flex-col md:w-1/2">
                  <p>
                    PostCode/Zip <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    className={`h-10 border ${
                      touched.pincode && errors.pincode
                        ? "border-red-500"
                        : "border-black"
                    } px-2 mb-1`}
                    onChange={handleChange}
                    required
                  />
                  {touched.pincode && (
                    <p className="text-xs mb-3 text-red-500">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>

              {/* Email + Phone */}
              <div className="flex flex-col md:flex-row gap-5 mb-5">
                <div className="flex flex-col md:w-1/2">
                  <p>
                    Email Address <span>*</span>
                  </p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className={`h-10 border ${
                      touched.email && errors.email
                        ? "border-red-500"
                        : "border-black"
                    } px-2 mb-1`}
                    onChange={handleChange}
                    required
                  />
                  {touched.email && (
                    <p className="text-xs mb-3 text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col md:w-1/2">
                  <p>
                    Phone <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    className={`h-10 border ${
                      touched.phone && errors.phone
                        ? "border-red-500"
                        : "border-black"
                    } px-2 mb-1`}
                    onChange={handleChange}
                    required
                  />
                  {touched.phone && (
                    <p className="text-xs mb-3 text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Hidden fields */}
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
