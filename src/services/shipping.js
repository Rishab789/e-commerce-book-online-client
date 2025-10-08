// utils/shippingService.js
const API_BASE_URL = process.env.REACT_APP_URL;

export const calculateShipping = async (pickupPostcode, deliveryPostcode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/calculate-shipping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pickup_postcode: pickupPostcode,
        delivery_postcode: deliveryPostcode,
        cod: 0, // Set to 1 if cash on delivery
      }),
    });

    const data = await response.json();

    if (data.success) {
      return data.shippingCharges;
    } else {
      throw new Error(data.message || "Failed to calculate shipping");
    }
  } catch (error) {
    console.error("Shipping calculation error:", error);
    throw error;
  }
};
