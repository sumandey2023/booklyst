import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import useThemeStore from "../store/useThemeStore";
import useAuthStore from "../store/useAuthStore";

const Nav = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest("nav")) {
        setMenuOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const { mode, toggleMode } = useThemeStore();
  const { SignOut: signOutBackend } = useAuthStore();

  useEffect(() => {
    // initialize class on mount
    if (mode === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [mode]);

  // Close user menu on outside click / escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest("[data-user-menu-root]") && !event.target.closest("[data-user-menu-button]")) {
        setUserMenuOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setUserMenuOpen(false);
    };
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [userMenuOpen]);

  const handleSignOut = async () => {
    try {
      await signOutBackend?.();
    } catch {}
    try {
      await signOut();
    } catch {}
    setUserMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/service", label: "Services" },
    { to: "/rolelogin", label: "Get Started" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 md:hidden transition-all duration-500 ease-out"
          onClick={() => setMenuOpen(false)}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15), rgba(0, 0, 0, 0.4))",
          }}
        />
      )}

      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-out select-none
          ${
            scrolled
              ? "bg-white/80 dark:bg-slate-900/80"
              : "bg-white/95 dark:bg-slate-900/90"
          }
          backdrop-blur-xl border-b border-slate-100/60 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)]`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-purple-50/20 to-pink-50/30 dark:from-slate-900/10 dark:via-slate-900/20 dark:to-slate-900/10 opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo */}
            <NavLink
              to="/"
              className="flex items-center gap-3 group outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-2xl p-1 transition-all duration-300"
            >
              <div className="relative">
                {/* Animated logo container */}
                <div className="relative overflow-hidden rounded-2xl">
                  <span className="inline-flex w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl items-center justify-center text-white font-black text-2xl shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-2xl group-hover:shadow-indigo-500/25">
                    B
                  </span>
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 transition-all duration-300 group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600">
                  Booklyst
                </span>
                <span className="text-xs font-medium text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 -mt-1">
                  Discover & Book
                </span>
              </div>
            </NavLink>

            {/* Enhanced Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `relative px-5 py-2.5 rounded-2xl font-semibold text-sm group tracking-wide
                    transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
                    ${
                      isActive
                        ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-2xl shadow-indigo-500/30 ring-1 ring-indigo-300/40 dark:ring-indigo-500/30 scale-[1.02]"
                        : "text-indigo-700 dark:text-indigo-200 hover:text-indigo-800 dark:hover:text-indigo-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-slate-800 dark:hover:to-slate-800"
                    }`
                  }
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="flex items-center gap-2">{link.label}</span>
                  {/* Active/hover underline */}
                  <span className={`absolute -bottom-1 left-1/2 h-0.5 rounded-full transition-all duration-300 -translate-x-1/2 ${
                    // show underline when active; expand on hover for inactive
                    window.location && window.location.pathname && window.location.pathname === link.to
                      ? "w-3/4 bg-gradient-to-r from-indigo-500 to-purple-500"
                      : "w-0 group-hover:w-3/4 bg-gradient-to-r from-indigo-500 to-purple-500"
                  }`} />
                  {/* Glow on hover */}
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                </NavLink>
              ))}
            </div>

            {/* Theme toggle */}
            {/* <button
              onClick={toggleMode}
              className="hidden md:inline-flex mr-3 p-2 rounded-xl border border-indigo-100 dark:border-slate-700 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-50 dark:hover:bg-slate-800 transition"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {mode === "dark" ? "🌙" : "☀️"}
            </button> */}

            {/* Enhanced Desktop User Section */}
            <div className="hidden md:flex items-center ml-2 gap-3 relative" data-user-menu-root>
              {user ? (
                <>
                  <button
                    data-user-menu-button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-3 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-800 transition"
                    aria-haspopup="menu"
                    aria-expanded={userMenuOpen}
                    title="Account menu"
                  >
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm"
                    />
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 max-w-40 truncate">
                      {user.fullName || "Account"}
                    </span>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-[110%] w-56 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{user.fullName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.primaryEmailAddress?.emailAddress}</p>
                      </div>
                      <div className="py-1">
                        <NavLink to="/dashboard" className="block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200">Dashboard</NavLink>
                        <NavLink to="/auth" className="block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200">Profile</NavLink>
                      </div>
                      <div className="border-t border-slate-100 dark:border-slate-800">
                        <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Sign out</button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to="/auth"
                  className="relative px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-purple-400 transition-all duration-300 overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                  </span>
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </NavLink>
              )}
            </div>

            {/* Enhanced Hamburger Menu */}
            <button
              className="md:hidden relative p-3 rounded-2xl text-indigo-700 bg-gradient-to-r from-white/80 to-indigo-50/80 border border-indigo-100 hover:border-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <div className="relative w-6 h-6 flex flex-col items-center justify-center">
                <span
                  className={`block absolute w-6 h-0.5 rounded-full bg-indigo-700 transition-all duration-300 ease-in-out ${
                    menuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                  }`}
                />
                <span
                  className={`block absolute w-6 h-0.5 rounded-full bg-indigo-700 transition-all duration-200 ${
                    menuOpen ? "opacity-0 scale-75" : "opacity-100"
                  }`}
                />
                <span
                  className={`block absolute w-6 h-0.5 rounded-full bg-indigo-700 transition-all duration-300 ease-in-out ${
                    menuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Sidebar */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[90vw] z-[150]
          bg-white/95 backdrop-blur-2xl border-l border-indigo-100/50 shadow-2xl
          transition-all duration-500 ease-out ${
            menuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 pointer-events-none"
          }`}
      >
        {/* Animated gradient border */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-tr-full opacity-90" />

        {/* Floating background elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl" />

        <div className="flex flex-col h-full relative z-10">
          {/* Enhanced Header */}
          <div className="px-8 py-6 border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                B
              </div>
              <div>
                <h3 className="font-bold text-indigo-800">Navigation</h3>
                <p className="text-xs text-indigo-500">Explore our platform</p>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Links */}
          <div className="flex-1 px-6 py-8 overflow-y-auto">
            <div className="space-y-2">
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold text-base transition-all duration-300 group border-l-4 ${
                      isActive ? "border-indigo-500" : "border-transparent"
                    }
                    ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                        : "text-indigo-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-800"
                    }`
                  }
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transform: menuOpen ? "translateX(0)" : "translateX(50px)",
                    opacity: menuOpen ? 1 : 0,
                    transition: `all 0.5s ease-out ${index * 100}ms`,
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="flex-1">{link.label}</span>
                  <svg
                    className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Enhanced User Section */}
          <div className="p-6 border-t border-indigo-100/50 bg-gradient-to-r from-indigo-50/80 via-purple-50/60 to-pink-50/40">
            {user ? (
              <NavLink
                to="/auth"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 border border-indigo-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group"
                onClick={() => setMenuOpen(false)}
              >
                <div className="relative">
                  <img
                    src={user.imageUrl}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-indigo-200 shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-indigo-800 font-bold text-base truncate">
                    {user.fullName || "User"}
                  </p>
                  <p className="text-indigo-500 text-sm truncate">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-indigo-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </NavLink>
            ) : (
              <NavLink
                to="/auth"
                className="flex items-center justify-center gap-3 w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-95 transition-all duration-300 group"
                onClick={() => setMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Get Started Today
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
