import { Link, Navigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Search,
  Menu,
  Moon,
  ShoppingCart,
  House,
  Map,
  Headphones,
  FileText,
  LibraryBig,
  Book,
} from "lucide-react";
import React from "react";
import { ChevronDown } from "lucide-react";
import { useAuth } from "./contexts/AuthContext";
import { useSearch } from "./contexts/SearchContext.jsx";
import { getRandomColor } from "../utils/randomColorGenerator";
import AdvancedSearch from "./components/AdvancedSearch.jsx";

function Navbar() {
  const { isLoggedIn, user } = useAuth();
  const [bgColor, setBgColor] = useState("#000");
  const { setsearchQuery } = useSearch();
  const [input, setInput] = useState("");
  const [isAdvanced, setAdvanced] = useState(false);

  const toggleAdvanced = () => {
    setAdvanced((prev) => !prev);
  };

  const handleSearch = () => {
    setsearchQuery(input);
  };

  useEffect(() => {
    if (isLoggedIn) {
      setBgColor(getRandomColor());
    }
  }, [isLoggedIn]);
  return (
    <div className="flex flex-col bg-white shadow">
      {/* Top Navigation Bar */}
      <div className="p-3 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center">
        <div className="flex gap-1 items-center">
          <img className="h-8 w-8" src="logo.png" alt="" />
          <h1 className="font-[Karla,sans-serif] font-bold text-3xl">PUSTAK</h1>
        </div>
        {/* Search Bar */}
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row h-8 w-full sm:w-[20rem] md:w-[28rem] lg:w-[38rem] xl:w-[45rem] border overflow-hidden items-center">
            <input
              className="flex-grow border-none text-md font-[Karla,sans-serif] bg-gray-100 focus:outline-none px-2"
              type="text"
              placeholder="Search"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                // setsearchQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <Search
              size={19}
              onClick={handleSearch}
              className="cursor-pointer mr-2"
              color="black"
            />
          </div>
          <div
            onClick={toggleAdvanced}
            className="bg-purple-600 font-[Karla,sans-serif] text-white text-md h-8 p-1 border border-black cursor-pointer"
          >
            <p>Advanced Search</p>
          </div>
        </div>

        <div className="flex flex-row gap-3 items-center">
          <button className="border border-gray-300 px-3 py-1.5 font-semibold rounded-md hover:bg-gray-50 transition-colors flex justify-center items-center">
            <div className="flex flex-row gap-1.5 items-center">
              <ShoppingCart size={24} />
            </div>
          </button>

          {isLoggedIn ? (
            <Link
              to="/profile"
              title={user.username}
              className="flex justify-center items-center rounded-full w-9 h-9 text-white font-bold cursor-pointer select-none"
              style={{ backgroundColor: bgColor }}
            >
              {user.username.charAt(0).toUpperCase()}
            </Link>
          ) : (
            <Link
              to="/login"
              className="border border-gray-300 px-3 py-1.5 font-semibold rounded-md hover:bg-gray-50 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Below navigation bar */}
      <div className="flex flex-row gap-10 justify-center font-semibold mt-2 pb-1 bg-gray-100 shadow">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-3xs flex flex-row gap-1 items-center ${
              isActive ? "text-purple-600" : "text-gray-600"
            }`
          }
        >
          <House size={20} />
          Home
        </NavLink>

        <NavLink
          to="/books"
          className={({ isActive }) =>
            `text-3xs flex flex-row gap-1 items-center ${
              isActive ? "text-purple-600" : "text-gray-600"
            }`
          }
        >
          <Book size={20} />
          Books
        </NavLink>

        <NavLink
          to="/map"
          className={({ isActive }) =>
            `text-3xs flex flex-row gap-1 items-center ${
              isActive ? "text-purple-600" : "text-gray-600"
            }`
          }
        >
          <Map size={20} />
          Map
        </NavLink>

        <NavLink
          to="/audiobook"
          className={({ isActive }) =>
            `text-3xs flex flex-row gap-1 items-center ${
              isActive ? "text-purple-600" : "text-gray-600"
            }`
          }
        >
          <Headphones size={20} />
          AudioBook
        </NavLink>

        <NavLink
          to="/ebooks"
          className={({ isActive }) =>
            `text-3xs flex flex-row gap-1 items-center ${
              isActive ? "text-purple-600" : "text-gray-600"
            }`
          }
        >
          <FileText size={20} />
          Ebooks
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `text-3xs flex flex-row gap-1 items-center ${
              isActive ? "text-purple-600" : "text-gray-600"
            }`
          }
        >
          <LibraryBig size={20} />
          Libraries
        </NavLink>
      </div>

      {isAdvanced && (
        <div className="absolute top-10 left-0 w-full sm:w-[20rem] md:w-[28rem] lg:w-[38rem] xl:w-[45rem] z-50 bg-white border border-gray-300 shadow-lg rounded-md p-4">
          <AdvancedSearch />
        </div>
      )}
    </div>
  );
}

export default Navbar;
