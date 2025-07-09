import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/gallery">Gallery</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/auth">login/signup</NavLink>
    </nav>
  );
};

export default Nav;
