import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../Services/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [successMessage, setSuccessMessage] = useState("");
  const [backendError, setBackendError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setBackendError("");
    setIsSubmitting(true);

    try {
      const response = await api.post("/users/forgotPassword", data);
      setSuccessMessage(
        response.data.message || "Reset link sent if email exists."
      );
    } catch (error) {
      setBackendError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Disable form if submit succeeded
  const isFormDisabled = successMessage !== "";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Section */}
      <div className="w-1/2 bg-gray-100 p-8 flex flex-col">
        <div className="flex gap-1 items-center">
          <img className="h-6 w-6" src="logo.png" alt="Logo" />
          <h1 className="font-[Karla,sans-serif] font-bold text-2xl">PUSTAK</h1>
        </div>

        <div className="flex flex-col ml-20 mt-24">
          <div className="flex flex-col font-[Inter,sans-serif]">
            <h1 className="text-4xl font-bold">Forgot Password</h1>
            <p className="text-xs ml-1 font-light text-gray-500">
              Please enter your email to verify
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col ml-1 font-[Inter,sans-serif]">
                <p className="text-xs font-medium">Email</p>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  disabled={isFormDisabled}
                  className="w-xs pl-1 h-6 text-xs font-light outline"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isFormDisabled || isSubmitting}
              className={`mt-10 font-[Inter,sans-serif] w-82 h-10 rounded-md text-white flex justify-center items-center gap-2 ${
                isFormDisabled || isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Submit"
              )}
            </button>

            {/* Show success message */}
            {successMessage && (
              <p className="text-green-600 text-sm mt-2 font-[Inter,sans-serif]">
                {successMessage}
              </p>
            )}

            {/* Show backend error */}
            {backendError && (
              <p className="text-red-600 text-sm mt-2 font-[Inter,sans-serif]">
                {backendError}
              </p>
            )}

            {/* Show "Remembered your password? Login" only before submit */}
            {!successMessage && !isSubmitting && (
              <p className="text-[14px] mt-4 font-[Inter,sans-serif]">
                Remembered your password?{" "}
                <Link to="/login" className="text-blue-600 cursor-pointer">
                  Login
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Right Section with full image */}
      <div className="w-1/2">
        <img
          src="/360_F_340078556_YD52qpLaiTbO5E0OF90FuOaAq3sZr8yF.jpg"
          alt="Full background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
