import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../Services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");
  const [backendError, setBackendError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setBackendError("");
    setIsSubmitting(true);
    try {
      // Call backend PATCH with token
      const response = await api.patch(`/users/resetPassword/${token}`, {
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });

      setSuccessMessage(response.data.message || "Password reset successful!");
      // Optionally redirect to login after short delay
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setBackendError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDisabled = successMessage !== "";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Section */}
      <div className="w-1/2 bg-gray-100 p-8 flex flex-col">
        <div className="flex gap-1 items-center">
          <img className="h-6 w-6" src="/logo.png" alt="Logo" />
          <h1 className="font-[Karla,sans-serif] font-bold text-2xl">PUSTAK</h1>
        </div>

        <div className="flex flex-col ml-20 mt-24">
          <div className="flex flex-col font-[Inter,sans-serif]">
            <h1 className="text-4xl ml-0.5 font-bold">Reset Password</h1>
            <p className="text-xs ml-1 font-light text-gray-500">
              Please enter your new password
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col ml-1 font-[Inter,sans-serif]">
                <p className="text-xs font-medium">New Password</p>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  disabled={isFormDisabled}
                  className="w-xs pl-1 h-6 text-xs font-light outline"
                />
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex flex-col ml-1 font-[Inter,sans-serif]">
                <p className="text-xs font-medium">Confirm Password</p>
                <input
                  type="password"
                  {...register("passwordConfirm", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  disabled={isFormDisabled}
                  className="w-xs pl-1 h-6 text-xs font-light outline"
                />
                {errors.passwordConfirm && (
                  <p className="text-red-600 text-xs mt-1">{errors.passwordConfirm.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isFormDisabled || isSubmitting}
              className={`mt-10 font-[Inter,sans-serif] w-82 h-10 rounded-md text-white flex justify-center items-center gap-2 ${
                isFormDisabled || isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600"
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
                "Reset Password"
              )}
            </button>

            {successMessage && (
              <p className="text-green-600 text-sm mt-2 font-[Inter,sans-serif]">
                {successMessage} Redirecting to <Link to="/login" className="text-blue-600">Login</Link>...
              </p>
            )}

            {backendError && (
              <p className="text-red-600 text-sm mt-2 font-[Inter,sans-serif]">
                {backendError}
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
