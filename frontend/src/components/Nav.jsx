import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { useUser } from "@clerk/clerk-react";

const Nav = () => {
  const { user } = useUser();

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md shadow-md  px-4 md:px-12 py-3 flex justify-between items-center">
      {/* Logo/Brand */}
      <div className="flex items-center gap-2 select-none">
        <span className="inline-block w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow">
          B
        </span>
        <span className="text-xl md:text-2xl font-extrabold text-blue-700 tracking-tight">
          Booklyst
        </span>
      </div>
      {/* Navigation Links */}
      <div className="flex gap-2 md:gap-6 text-base md:text-lg font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-1 rounded-lg transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700 ${
              isActive ? "bg-blue-600 text-white shadow" : "text-blue-800"
            }`
          }
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-3 py-1 rounded-lg transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700 ${
              isActive ? "bg-blue-600 text-white shadow" : "text-blue-800"
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            `px-3 py-1 rounded-lg transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700 ${
              isActive ? "bg-blue-600 text-white shadow" : "text-blue-800"
            }`
          }
        >
          Gallery
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `px-3 py-1 rounded-lg transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700 ${
              isActive ? "bg-blue-600 text-white shadow" : "text-blue-800"
            }`
          }
        >
          Products
        </NavLink>
      </div>
      {/* User/Profile or Login/Signup */}
      {user ? (
        <NavLink
          to="/auth"
          className="flex items-center gap-2 ml-4 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors duration-200"
        >
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-blue-400 shadow"
          />
          <span className="text-blue-700 font-semibold text-sm">
            {user.fullName || user.primaryEmailAddress?.emailAddress}
          </span>
        </NavLink>
      ) : (
        <NavLink
          to="/auth"
          className="ml-4 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Login/Signup
        </NavLink>
      )}
    </nav>
  );
};

export default Nav;
