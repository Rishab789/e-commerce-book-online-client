import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "../components/Button";
import ModalForm from "../components/ModalForm ";
import { LogInContext } from "../contexts/LogInContext";

const API_BASE = `${process.env.REACT_APP_URL}/api/v1`;

const AddressAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const { userId } = useContext(LogInContext);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // const [selectedAddressId, setSelectedAddressId] = useState(() => {
  //   // Get selected address from localStorage based on userId
  //   if (userId) {
  //     return localStorage.getItem(`selectedAddressId_${userId}`) || null;
  //   }
  //   return null;
  // });

  // // Persist selected address to localStorage whenever it changes
  // useEffect(() => {
  //   if (userId) {
  //     if (selectedAddressId) {
  //       localStorage.setItem(`selectedAddressId_${userId}`, selectedAddressId);
  //     } else {
  //       localStorage.removeItem(`selectedAddressId_${userId}`);
  //     }
  //   }
  // }, [selectedAddressId, userId]);

  // // Update selectedAddressId when userId changes (user login/logout)
  // useEffect(() => {
  //   if (userId) {
  //     const userSpecificSelectedId = localStorage.getItem(
  //       `selectedAddressId_${userId}`
  //     );
  //     setSelectedAddressId(userSpecificSelectedId);
  //   } else {
  //     setSelectedAddressId(null);
  //   }
  // }, [userId]);

  // Fetch addresses from API
  useEffect(() => {
    if (userId) {
      fetchAddresses(userId);
    }
  }, [userId]);

  // const fetchAddresses = async (userId) => {
  //   console.log("this is coming from getaddress ", userId);
  //   try {
  //     const res = await axios.get(`${API_BASE}/getAddresses/${userId}`);
  //     setAddresses(res.data.addresses || []);
  //   } catch (err) {
  //     console.error("Error fetching addresses:", err);
  //   }
  // };

  const fetchAddresses = async (userId) => {
    try {
      const res = await axios.get(`${API_BASE}/getAddresses/${userId}`);
      setAddresses(res.data.addresses || []);

      // Find default address
      const defaultAddr = res.data.addresses.find((a) => a.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr._id);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  // Add or Update address
  const handleAddOrEditAddress = async (data) => {
    console.log("this is address data ", data);
    try {
      if (editingAddress) {
        // Update
        await axios.put(
          `${API_BASE}/updateAddress/${editingAddress._id}`,
          data
        );
      } else {
        // Add
        await axios.post(`${API_BASE}/addAddress`, data);
      }
      fetchAddresses(userId);
    } catch (err) {
      console.error("Error saving address:", err);
    }
  };

  // Delete address
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/deleteAddress/${id}`);
      // If deleted address was selected, clear selection
      if (selectedAddressId === id) {
        setSelectedAddressId(null);
        localStorage.removeItem(`selectedAddressData_${userId}`);
      }
      fetchAddresses(userId);
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  // // Handle address selection
  // const handleSelectAddress = (address) => {
  //   setSelectedAddressId(address._id);

  //   // Store the complete address data in localStorage with userId prefix
  //   const addressData = {
  //     firstName: address.firstName,
  //     lastName: address.lastName,
  //     email: address.email,
  //     phone: address.phone,
  //     street: address.address.street,
  //     landmark: address.address.landmark || "",
  //     city: address.address.city,
  //     state: address.address.state,
  //     pincode: address.address.pincode,
  //   };

  //   localStorage.setItem(
  //     `selectedAddressData_${userId}`,
  //     JSON.stringify(addressData)
  //   );
  // };

  const handleSelectAddress = async (address) => {
    try {
      await axios.patch(`${API_BASE}/setDefaultAddress`, {
        userId,
        addressId: address._id,
      });

      setSelectedAddressId(address._id); // Update state
      fetchAddresses(userId); // Refresh the list to reflect default change
    } catch (err) {
      console.error("Error setting default address:", err);
    }
  };

  return (
    <div>
      <p className="text-2xl border-b-2 mb-5">Billing Address</p>

      {addresses.length > 0 ? (
        <div className="space-y-5">
          {addresses.map((address, index) => (
            <div
              key={address._id}
              className={`p-4 border rounded-lg shadow-sm flex justify-between items-start transition-all duration-300 ${
                selectedAddressId === address._id
                  ? "bg-green-100 border-green-400 shadow-md"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              {/* Address Info */}
              <div>
                <p className="font-semibold">
                  {address.firstName} {address.lastName}
                </p>
                <p>
                  {address.address.city}, {address.address.state}
                </p>
                <p>Street: {address.address.street}</p>
                {address.address.landmark && (
                  <p>Landmark: {address.address.landmark}</p>
                )}
                <p>Pin: {address.address.pincode}</p>
                <p>Mob: {address.phone}</p>
                <p>Email: {address.email}</p>
                {address.isDefault && (
                  <p className="text-sm text-green-600 font-medium">
                    Default Address
                  </p>
                )}
                {selectedAddressId === address._id && (
                  <p className="text-sm text-green-700 font-semibold mt-2">
                    ✓ Selected for Shipping
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2">
                <Button
                  value={
                    selectedAddressId === address._id ? "Selected" : "Select"
                  }
                  color={
                    selectedAddressId === address._id ? "primary" : "sign-color"
                  }
                  onClick={() => handleSelectAddress(address)}
                />

                <div className="flex space-x-2">
                  <Button
                    value="Edit"
                    color="sign-color"
                    onClick={() => {
                      setEditingAddress(address);
                      setIsModalOpen(true);
                    }}
                  />
                  <Button
                    value="Delete"
                    color="red"
                    onClick={() => handleDelete(address._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No address added yet.</p>
      )}

      {/* Add New */}
      <div className="mt-6">
        <Button
          value="Add Address"
          color="sign-color"
          onClick={() => {
            setEditingAddress(null);
            setIsModalOpen(true);
          }}
        />
      </div>

      {/* Modal */}
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAddress(null);
        }}
        onSubmit={handleAddOrEditAddress}
        defaultData={editingAddress}
      />
    </div>
  );
};

export default AddressAccount;
