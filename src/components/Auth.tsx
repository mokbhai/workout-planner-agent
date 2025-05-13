import React, { useState, useEffect } from "react";

const Auth: React.FC = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    otp: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Check for error in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    if (error === "auth_failed") {
      setAuthError("Authentication failed. Please try again.");
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For phone number, only allow numbers and format with spaces
    if (name === "phoneNumber") {
      const cleaned = value.replace(/\D/g, "");
      const formatted = cleaned.length > 10 ? cleaned.slice(0, 10) : cleaned;
      setFormData((prev) => ({ ...prev, [name]: formatted }));
      return;
    }

    // For OTP, only allow numbers
    if (name === "otp") {
      const cleaned = value.replace(/\D/g, "");
      const formatted = cleaned.length > 6 ? cleaned.slice(0, 6) : cleaned;
      setFormData((prev) => ({ ...prev, [name]: formatted }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePhoneNumber = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (formData.otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePhoneNumber()) {
      try {
        setIsLoading(true);
        setAuthError(null);

        const response = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber: formData.phoneNumber }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to send OTP");
        }

        // Move to OTP verification step
        setStep("otp");

        // Start resend timer
        setIsResendDisabled(true);
        setResendTimer(30);

        // Clear any previous errors
        setAuthError(null);
      } catch (error) {
        setAuthError(
          error instanceof Error
            ? error.message
            : "Failed to send OTP. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateOTP()) {
      try {
        setIsVerifying(true);
        setAuthError(null);

        const response = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: formData.phoneNumber,
            otp: formData.otp,
          }),
        });

        const data = await response.json();

        console.log(data);
        if (!response.ok) {
          throw new Error(data.error || "Failed to verify OTP");
        }

        if (!data.user || !data.user.name) {
          window.location.href = "/user/onboarding";
        }

        // Redirect to dashboard or home page after successful verification
        window.location.href = "/dashboard";
      } catch (error) {
        setAuthError(
          error instanceof Error
            ? error.message
            : "Invalid OTP. Please try again."
        );
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const handleResendOTP = async () => {
    if (!isResendDisabled) {
      try {
        setIsLoading(true);
        setAuthError(null);

        const response = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber: formData.phoneNumber }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to resend OTP");
        }

        // Start resend timer
        setIsResendDisabled(true);
        setResendTimer(30);

        // Clear any previous errors
        setAuthError(null);
      } catch (error) {
        setAuthError(
          error instanceof Error
            ? error.message
            : "Failed to resend OTP. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleStravaLogin = () => {
    window.location.href = "/api/auth/strava";
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {step === "phone" ? "Continue with Phone" : "Enter OTP"}
      </h2>

      {authError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {authError}
        </div>
      )}

      <form
        onSubmit={step === "phone" ? handleSendOTP : handleVerifyOTP}
        className="space-y-4"
      >
        {step === "phone" ? (
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                +91
              </span>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={isLoading}
                className={`flex-1 min-w-0 block border-2 w-full px-3 py-2 rounded-none rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } ${isLoading ? "bg-gray-100" : ""}`}
                placeholder="Enter your phone number"
                maxLength={10}
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>
        ) : (
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              disabled={isVerifying}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
                errors.otp ? "border-red-500" : "border-gray-300"
              } ${isVerifying ? "bg-gray-100" : ""}`}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
            {errors.otp && (
              <p className="mt-1 text-sm text-red-600">{errors.otp}</p>
            )}
            <div className="mt-2 text-sm text-gray-600 flex justify-between items-center">
              <span>Didn't receive OTP?</span>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResendDisabled || isLoading}
                className={`text-indigo-600 hover:text-indigo-800 font-medium ${
                  isResendDisabled || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isResendDisabled ? `Resend in ${resendTimer}s` : "Resend OTP"}
              </button>
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={step === "phone" ? isLoading : isVerifying}
            className={`w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors flex items-center justify-center ${
              (step === "phone" ? isLoading : isVerifying)
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
          >
            {step === "phone" ? (
              isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )
            ) : isVerifying ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </div>
      </form>

      {/* <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleStravaLogin}
            className="w-full flex items-center justify-center border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <img
              src="/images/partners/strava/btn_strava_connect_with_white.svg"
              alt="Strava"
            />
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Auth;
