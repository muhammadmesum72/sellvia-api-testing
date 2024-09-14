"use client";
import React, { useState } from "react";
import Link from "next/link";

// Helper functions to validate inputs
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{10,15}$/; 
  return phoneRegex.test(phoneNumber);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return passwordRegex.test(password);
};

const Step1 = ({ formData, setFormData }) => (
  <div>
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-1 font-semibold text-gray-700">First Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-1 font-semibold text-gray-700">Last Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <label className="mb-1 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      
      <div>
        <label className="mb-1 font-semibold text-gray-700">Affiliate Username</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </div>

      <div>
        <label className="mb-1 font-semibold text-gray-700">Phone Number</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
        />
      </div>

      <div>
        <label className="mb-1 font-semibold text-gray-700">Affiliate Referral ID</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="1234 5678 9101"
          value={formData.referralId}
          onChange={(e) =>
            setFormData({ ...formData, referralId: e.target.value })
          }
        />
      </div>
    </div>
  </div>
);

const Step2 = ({ formData, setFormData }) => (
  <div className="space-y-6">
    <div>
      <label className="mb-1 font-semibold text-gray-700">Password</label>
      <input
        type="password"
        className="input input-bordered w-full"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
    </div>
    
    <div>
      <label className="mb-1 font-semibold text-gray-700">Confirm Password</label>
      <input
        type="password"
        className="input input-bordered w-full"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
      />
    </div>
  </div>
);

const Step3 = ({ formData, setFormData }) => (
  <div>
    <label className="mb-1 font-semibold text-gray-700">6-Digit Verification</label>
    <input
      type="text"
      className="input input-bordered w-full"
      maxLength={6}
      placeholder="Enter verification code"
      value={formData.verificationCode}
      onChange={(e) =>
        setFormData({ ...formData, verificationCode: e.target.value })
      }
    />
  </div>
);

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    referralId: "",
    verificationCode: ""
  });

  const token = "a1c3153183a8a6c519ef4308aed1a14df597161bbfe83a555ff9181c2389df48"; // Fake token for example; replace with actual token fetching logic

  // Validation Function
  const validateStep = () => {
    if (currentStep === 1) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.username ||
        !formData.phoneNumber ||
        !formData.referralId
      ) {
        setErrorMessage("Please fill in all fields.");
        return false;
      }
      if (!validateEmail(formData.email)) {
        setErrorMessage("Please enter a valid email.");
        return false;
      }
      if (!validatePhoneNumber(formData.phoneNumber)) {
        setErrorMessage("Please enter a valid phone number.");
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.password || !formData.confirmPassword) {
        setErrorMessage("Please fill in all fields.");
        return false;
      }
      if (!validatePassword(formData.password)) {
        setErrorMessage(
          "Password must be at least 8 characters long, contain one uppercase, one lowercase, one number, and one special character."
        );
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.verificationCode) {
        setErrorMessage("Please enter the verification code.");
        return false;
      }
      if (formData.verificationCode.length !== 6 || isNaN(formData.verificationCode)) {
        setErrorMessage("Please enter a valid 6-digit verification code.");
        return false;
      }
    }
    return true;
  };

  // Function to handle API signup
  const signUp = async () => {
    if (!validateStep()) return;

    try {
      setLoading(true);
      setErrorMessage(null); // Clear any previous errors
      setSuccessMessage(null); // Clear any previous success messages

      const fullName = `${formData.firstName} ${formData.lastName}`;
      const payload = {
        username: formData.username,
        password: formData.password,
        phone: formData.phoneNumber,
        fullname: fullName,
        email: formData.email,
        referal_id: formData.referralId,
        token: token,  // Include the token
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Detect timezone
      };

      const response = await fetch("https://sellvia.business/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Signup successful:", responseData);

      // Set the email sent state to true and move to step 3
      setIsEmailSent(true);
      setSuccessMessage("Account created successfully!");
      setCurrentStep(3);
    } catch (error) {
      setErrorMessage("Sign Up failed. Please try again.");
      console.error("Sign Up Error", error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 2) {
      signUp(); // Call the signup function if on step 2
    } else if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 bg-white shadow-md rounded-lg p-8">
      <div className="flex justify-center mb-6">
        <div className={`rounded-full w-12 h-12 flex items-center justify-center text-white ${currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-400'}`}>01</div>
        <div className={`w-16 h-px bg-${currentStep >= 2 ? 'blue-600' : 'gray-400'} mt-3 mx-4`}></div>
        <div className={`rounded-full w-12 h-12 flex items-center justify-center text-white ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-400'}`}>02</div>
        <div className={`w-16 h-px bg-${currentStep >= 3 ? 'blue-600' : 'gray-400'} mt-3 mx-4`}></div>
        <div className={`rounded-full w-12 h-12 flex items-center justify-center text-white ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-400'}`}>03</div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Affiliate Partner Registration</h2>
        <p className="text-gray-600">Sellvia Business guarantees a starting income of $5,000 for active affiliates who fulfill orders.</p>
      </div>

      <div className="space-y-6">
        {currentStep === 1 && <Step1 formData={formData} setFormData={setFormData} />}
        {currentStep === 2 && <Step2 formData={formData} setFormData={setFormData} />}
        {currentStep === 3 && <Step3 formData={formData} setFormData={setFormData} />}
      </div>

      <div className="mt-8">
        {currentStep < 3 ? (
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={nextStep}
            disabled={loading}
          >
            {loading ? "Processing..." : "Next"}
          </button>
        ) : (
          <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition" onClick={() => alert("Account created!")}>
            Verify
          </button>
        )}
      </div>

      <div className="text-center mt-6 text-gray-600">
        {currentStep < 3 ? (
          <div>
            Have an account?{" "}

              <a className="text-blue-600 hover:underline">Sign In</a>

          </div>
        ) : (
          <div>
            Didn’t receive an email?{" "}

              <a className="text-blue-600 hover:underline">Resend</a>

          </div>
        )}
      </div>

      {errorMessage && <div className="text-center mt-4 text-red-600">{errorMessage}</div>}
      {successMessage && <div className="text-center mt-4 text-green-600">{successMessage}</div>}
    </div>
  );
};

export default Register;
