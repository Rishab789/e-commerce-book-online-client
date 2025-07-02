import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import "./Checkout.css";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;

  useEffect(() => {
    console.log("Received cart items: ", cartItems);
    console.log("Received total price: ", totalPrice);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = (e) => {
    e.preventDefault();

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

    console.log("Final Order Payload:", orderData);
    // Make your API call here to submit `orderData`
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
                    className="h-10 border border-black"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col md:w-1/2">
                  <p>
                    Last Name <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="lastName"
                    className="h-10 border border-black"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <p>
                Address <span>*</span>
              </p>
              <input
                type="text"
                name="street"
                className="h-10 border w-full mb-5 border-black"
                placeholder="Street address"
                onChange={handleChange}
                required
              />

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
                  className="h-10 border w-full border-black"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-5 mb-5">
                <div className="flex flex-col md:w-1/2">
                  <p>
                    State <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="state"
                    className="h-10 border border-black"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col md:w-1/2">
                  <p>
                    PostCode/Zip <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="pincode"
                    className="h-10 border border-black"
                    onChange={handleChange}
                    required
                  />
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
                    className="h-10 border border-black"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col md:w-1/2">
                  <p>
                    Phone <span>*</span>
                  </p>
                  <input
                    type="text"
                    name="phone"
                    className="h-10 border border-black"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Hidden fields for gstPrice and shippingCost */}
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
