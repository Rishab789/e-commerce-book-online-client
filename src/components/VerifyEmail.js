import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);

  console.log("Token from URL:", token);
  console.log("API URL:", process.env.REACT_APP_URL);

  useEffect(() => {
    async function verify() {
      // Check if token exists
      if (!token) {
        toast.error("❌ Invalid verification link");
        navigate("/signup");
        return;
      }

      // Check if API URL is configured
      if (!process.env.REACT_APP_URL) {
        console.error("REACT_APP_URL environment variable is not set");
        toast.error("❌ Configuration error. Please contact support.");
        navigate("/signup");
        return;
      }

      try {
        setIsVerifying(true);
        console.log(
          `Making request to: ${process.env.REACT_APP_URL}/api/v1/verify-email/${token}`
        );

        const res = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/verify-email/${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        console.log("Verification response:", data);

        if (res.ok) {
          toast.success(
            "✅ Email verified successfully! Your account has been created. Please login to continue."
          );

          // Redirect to login page since account is now created but user needs to login
          setTimeout(() => {
            navigate("/signin");
          }, 2000); // Wait 2 seconds to show success message
        } else {
          // Handle different error cases
          if (res.status === 400 && data.message?.includes("already exists")) {
            toast.error("Account already exists. Please login instead.");
            navigate("/signin");
          } else if (data.message?.includes("expired")) {
            toast.error(
              "❌ Verification link has expired. Please sign up again."
            );
            navigate("/signup");
          } else {
            toast.error(data.message || "❌ Verification failed.");
            navigate("/signup");
          }
        }
      } catch (err) {
        console.error("Verification error:", err);
        toast.error(
          "❌ Network error. Please check your connection and try again."
        );
        navigate("/signup");
      } finally {
        setIsVerifying(false);
      }
    }

    verify();
  }, [token, navigate]);

  if (isVerifying) {
    return (
      <div className="text-center mt-20">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-lg">Verifying your email...</p>
        <p className="text-sm text-gray-600 mt-2">
          Please wait while we confirm your account.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center mt-20">
      <p className="text-lg">Verification complete. Redirecting...</p>
    </div>
  );
}
