import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./Layout.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Map, Home, AudioBook, Books, Ebook, Login } from "./Pages/index.js";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Profile from "./Pages/Profile.jsx";
import { SearchProvider } from "./contexts/SearchContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes using the main Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="map" element={<Map />} />
        <Route path="audiobook" element={<AudioBook />} />
        <Route path="books" element={<Books />} />
        <Route path="ebooks" element={<Ebook />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword/:token" element={<ResetPassword />} />
      <Route path="/profile" element={<Profile />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </AuthProvider>
  </StrictMode>
);
