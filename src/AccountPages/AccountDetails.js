import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "../components/Button";
import { LogInContext } from "./../contexts/LogInContext"; // Adjust the import path as needed

const API_BASE = `${process.env.REACT_APP_URL}/api/v1`;

const AccountDetails = () => {
  const { userId } = useContext(LogInContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // Check if userId is available
      if (!userId) {
        setError("User ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE}/getUser/${userId}`);

        if (response.data.success) {
          setUserData(response.data.user);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.response?.data?.message || "Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]); // Dependency on userId

  if (loading) {
    return (
      <div>
        <p className="text-2xl border-b-2 mb-5">Account Details</p>
        <div className="mb-5">
          <p>Loading user information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-2xl border-b-2 mb-5">Account Details</p>
        <div className="mb-5">
          <p className="text-red-500">Error: {error}</p>
          <Button
            text="Retry"
            onClick={() => window.location.reload()}
            className="mt-3"
          />
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div>
        <p className="text-2xl border-b-2 mb-5">Account Details</p>
        <div className="mb-5">
          <p>No user data found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-2xl border-b-2 mb-5">Account Details</p>
      <div className="mb-5">
        <p className="text-lg font-semibold">
          Name: {userData.fullName || userData.name || "N/A"}
        </p>
        <p className="text-sm lg:text-xl text-gray-600">
          Email: {userData.email || "N/A"}
        </p>
      </div>

      {/* Additional user information if available */}
      {userData.phone && (
        <p className="text-sm lg:text-xl text-gray-600">
          Phone: {userData.phone}
        </p>
      )}

      {userData.address && (
        <p className="text-sm lg:text-xl text-gray-600">
          Address: {userData.address}
        </p>
      )}

      <div className="mt-6">
        <Button
          text="Edit Profile"
          onClick={() => console.log("Edit profile clicked")}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        />
      </div>
    </div>
  );
};

export default AccountDetails;
