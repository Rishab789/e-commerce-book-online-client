import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { LogInContext } from "../contexts/LogInContext";

const ModalForm = ({ isOpen, onClose, onSubmit, defaultData }) => {
  const { userId } = useContext(LogInContext); // Extract userId from context

  const [formData, setFormData] = useState({
    user: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  // Load default data when editing
  useEffect(() => {
    if (defaultData) {
      setFormData(defaultData);
    } else {
      setFormData({
        user: userId,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: {
          street: "",
          landmark: "",
          city: "",
          state: "",
          pincode: "",
        },
      });
    }
  }, [defaultData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // 🔥 API call will be handled in parent
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl mx-4 mt-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {defaultData ? "Edit Address" : "Add Address"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>

          {/* Address Section */}
          <div className="space-y-3">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
            <input
              type="text"
              name="landmark"
              placeholder="Landmark (Optional)"
              value={formData.address.landmark}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.address.city}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.address.state}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {defaultData ? "Update Address" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
