import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../Services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm();
  const { login: loginUser } = useAuth();

  const onSubmit = async (data) => {
    setBackendError("");
    setSuccessMessage("");
    setIsSubmitting(true);
    try {
      const url = isRegistering ? "/users/signup" : "/users/login";
      const response = await api.post(url, data);
      const {
        token,
        data: { user },
      } = response.data;

      const minimalUser = {
        id: user._id,
        email: user.email,
        username: user.username,
      };

      loginUser(token, minimalUser);
      setSuccessMessage(isRegistering ? "Registration successful!" : "Login successful!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/");
      console.log(response.data);
    } catch (error) {
      setBackendError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Section */}
      <div className="w-1/2 bg-gray-100 p-8 flex flex-col">
        <div className="flex gap-1 items-center">
          <img className="h-6 w-6" src="logo.png" alt="" />
          <h1 className="font-[Karla,sans-serif] font-bold text-2xl">PUSTAK</h1>
        </div>

        <div className="flex flex-col ml-20 mt-24">
          <div className="flex flex-col font-[Inter,sans-serif]">
            <h1 className="text-4xl font-bold">
              {isRegistering ? "Create Account" : "Welcome back"}
            </h1>
            <p className="text-xs ml-1 font-light text-gray-500">
              {isRegistering ? "Please fill in your details" : "Please enter your details"}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 mt-8">
              <div className="flex flex-col ml-1 font-[Inter,sans-serif]">
                <p className="text-xs font-medium">Username</p>
                <input
                  className="w-xs pl-1 h-6 text-xs font-light outline"
                  type="text"
                  {...register("username")}
                />
              </div>
              <div className="flex flex-col ml-1 font-[Inter,sans-serif]">
                <p className="text-xs font-medium">Email</p>
                <input
                  className="w-xs pl-1 h-6 text-xs font-light outline"
                  type="text"
                  {...register("email")}
                />
              </div>
              <div className="flex flex-col ml-1 font-[Inter,sans-serif]">
                <p className="text-xs font-medium">Password</p>
                <input
                  className="w-xs pl-1 h-6 text-xs font-light outline"
                  type="password"
                  {...register("password")}
                />
              </div>

              {isRegistering && (
                <div className="flex flex-col ml-1 font-[Inter,sans-serif]">
                  <p className="text-xs font-medium">Confirm Password</p>
                  <input
                    className="w-xs pl-1 h-6 text-xs font-light outline"
                    type="password"
                    {...register("passwordConfirm")}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col mt-20">
              <div className="flex flex-col gap-2">
                {/* Remember Me + Forgot Password */}
                <div className="flex flex-row">
                  <div className="flex flex-row gap-0.5 items-center">
                    <input
                      type="checkbox"
                      className="ml-1 w-3 h-3 appearance-none border checked:bg-blue-600 checked:border-transparent focus:outline-none"
                    />
                    <p className="text-[11px] font-medium">Remember me for 90 days</p>
                  </div>
                  <Link to="/forgotPassword" className="text-[11px] font-medium text-blue-500 mx-23">
                    Forgot Password
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-[Inter,sans-serif] bg-purple-600 text-white w-82 h-10 rounded-md flex items-center justify-center gap-2"
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
                    isRegistering ? "Register" : "Sign in"
                  )}
                </button>

                {/* Google Sign-in */}
                <button className="flex items-center justify-center gap-2 font-[Inter,sans-serif] bg-white text-black border border-gray-300 w-82 h-10 rounded-md shadow-sm hover:bg-gray-100">
                  <img src="/google.svg" alt="Google" className="h-5 w-5" />
                  Sign in with Google
                </button>

                {/* Toggle Register/Login */}
                <p className="text-[14px] mt-2 font-[Inter,sans-serif]">
                  {isRegistering ? (
                    <>
                      Not the first time.{" "}
                      <span className="text-blue-600 cursor-pointer" onClick={() => setIsRegistering(false)}>
                        Login
                      </span>
                    </>
                  ) : (
                    <>
                      Don't have a account.{" "}
                      <span className="text-blue-600 cursor-pointer" onClick={() => setIsRegistering(true)}>
                        Register Now
                      </span>
                    </>
                  )}
                </p>

                {/* Success & Error Messages */}
                {successMessage && (
                  <p className="text-green-600 text-sm mt-2 font-[Inter,sans-serif]">
                    {successMessage}
                  </p>
                )}
                {backendError && (
                  <p className="text-red-600 text-sm mt-2 font-[Inter,sans-serif]">
                    {backendError}
                  </p>
                )}
              </div>
            </div>
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