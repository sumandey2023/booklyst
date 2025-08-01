import React from "react";
import EcommerceComponent from "../components/EcommerceComponent";
import ServiceComponent from "../components/ServiceComponet";
import ResturantComponent from "../components/ResturantComponent";
import ResortComponent from "../components/ResortComponent";

// Banners for the carousel
const banners = [
  {
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1000&q=80",
    text: "Big Summer Sale! Up to 50% off on select products.",
  },
  {
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80",
    text: "Book Home Services Instantly – Trusted Professionals.",
  },
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    text: "Reserve Your Table at Top Restaurants.",
  },
];

// Carousel
function Carousel() {
  const [current, setCurrent] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(
      () => setCurrent((c) => (c + 1) % banners.length),
      4300
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full h-56 md:h-72 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-white/60 to-blue-50 mb-12 select-none">
      {banners.map((banner, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-750 ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={banner.img}
            alt="Banner"
            className="w-full h-full object-cover scale-105 blur-[2px]"
          />
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center px-6">
            <span className="text-blue-950 text-xl md:text-3xl font-bold drop-shadow-lg text-center shadow-lg px-3 py-2 rounded-2xl bg-white/30">
              {banner.text}
            </span>
          </div>
        </div>
      ))}
      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, idx) => (
          <button
            key={idx}
            className={`transition-colors w-3.5 h-3.5 rounded-full border-2 border-white/80 ${
              idx === current ? "bg-blue-600 shadow" : "bg-white/40"
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const featureData = [
  {
    label: "Shop",
    icon: (
      // eCommerce
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 stroke-blue-500"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M3 7h18M6 7V5a3 3 0 1 1 6 0v2m-6 0h6M6 21H4a2 2 0 0 1-2-2V7h20v12a2 2 0 0 1-2 2h-2M6 21V10m12 11V10"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Component: EcommerceComponent,
    color: "from-cyan-100 via-white to-blue-100",
  },
  {
    label: "Services",
    icon: (
      // Service
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 stroke-blue-400"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
        <path d="M8 12.5h8M12 8v8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    Component: ServiceComponent,
    color: "from-pink-100 via-white to-purple-100",
  },
  {
    label: "Restaurants",
    icon: (
      // Restaurant
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 stroke-orange-400"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6 8V6a3 3 0 0 1 6 0v2M10 21v-9m6 9v-9m0-5a2.5 2.5 0 1 1 5 0c0 2.21-1.79 4-4 4s-4-1.79-4-4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Component: ResturantComponent,
    color: "from-yellow-100 via-white to-orange-100",
  },
  {
    label: "Resorts",
    icon: (
      // Resort
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 stroke-green-400"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="14" r="8" strokeWidth="1.5" />
        <path
          d="M8 14v2m8-2v2m-8-4a4 4 0 0 1 8 0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    Component: ResortComponent,
    color: "from-green-100 via-white to-lime-100",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200 flex flex-col scroll-smooth font-sans antialiased transition-all duration-300">
      {/* HERO SECTION */}
      <section className="relative w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 md:py-20 gap-10 md:gap-20 z-10">
        {/* Hero Left */}
        <div className="flex-1 flex flex-col items-start gap-5 animate-fade-in-up">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 via-blue-300 to-teal-200 text-blue-700 font-semibold text-xs shadow mb-3 uppercase tracking-widest">
            New & Improved
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-1 text-slate-900 leading-tight drop-shadow-2xl">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600">
              All-in-One
            </span>{" "}
            Platform
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-blue-500 mb-3">
            Shopping, Booking & More.
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-7 max-w-xl">
            Discover, shop, and book everything you need — from products and
            services to restaurants and resorts —
            <span className="text-blue-500 font-medium">
              {" "}
              in one seamless place
            </span>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#features"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-500 text-white text-lg shadow-lg hover:scale-105 hover:bg-blue-700 transition font-semibold"
            >
              Get Started
            </a>
            <a
              href="#"
              className="px-7 py-3 rounded-full border border-blue-300 text-blue-600 bg-white/50 hover:bg-blue-50 shadow hover:scale-105 transition text-lg font-medium"
            >
              Learn More
            </a>
          </div>
        </div>
        {/* Hero Right */}
        <div className="flex-1 flex justify-center animate-fade-in">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
              alt="Platform Preview"
              className="rounded-3xl shadow-2xl w-full max-w-md object-cover border-[4px] border-white/60"
            />
            {/* Soft Glow */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-80 h-9 rounded-full bg-blue-400 blur-2xl opacity-25 -z-10" />
          </div>
        </div>
      </section>
      {/* CAROUSEL */}
      <section className="px-6 md:px-16 animate-fade-in-up">
        <Carousel />
      </section>
      {/* FEATURES */}
      <section
        id="features"
        className="px-4 md:px-16 py-14 bg-gradient-to-tr from-slate-50 via-white to-blue-50/60 rounded-3xl shadow-md mx-2 md:mx-10 mb-8"
      >
        <h2 className="text-2xl md:text-4xl font-extrabold text-blue-800 text-center mb-2 animate-fade-in-up tracking-tight">
          Explore Our Features
        </h2>
        <p className="text-center text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
          Everything you need, just a tap away.{" "}
          <span className="font-semibold text-blue-700">
            Secure. Fast. Delightful.
          </span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
          {featureData.map(({ label, icon, Component, color }, idx) => (
            <div
              key={label}
              className={`
                flex flex-col items-center text-center shadow-[0_2px_24px_0px_rgba(84,124,242,0.09)]
                bg-gradient-to-br ${color} rounded-2xl p-6 md:p-7
                border border-blue-200/30 hover:shadow-lg hover:-translate-y-2 hover:bg-white/80
                transition-all duration-300 animate-fade-in-up
                ${
                  idx === 1
                    ? "delay-75"
                    : idx === 2
                    ? "delay-150"
                    : idx === 3
                    ? "delay-200"
                    : ""
                }
              `}
            >
              <div className="mb-3 drop-shadow-sm">{icon}</div>
              <div className="w-full min-h-[120px] flex flex-col grow">
                <span className="font-bold text-lg text-blue-700 mb-2">
                  {label}
                </span>
                <div className="flex-1">
                  <Component />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* FOOTER */}
      <footer className="mt-8 bg-white/70 backdrop-blur-lg border-t border-blue-100 py-10 px-6 md:px-16 rounded-t-3xl shadow-inner animate-fade-in-up">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-blue-800 font-bold text-lg tracking-tight flex items-center gap-2">
            <svg
              className="w-7 h-7 text-blue-600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <rect
                x="5"
                y="5"
                width="22"
                height="22"
                rx="6"
                fill="url(#footblue-gradient)"
              />
              <defs>
                <linearGradient
                  id="footblue-gradient"
                  x1="0"
                  y1="0"
                  x2="32"
                  y2="32"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#82aaff" />
                  <stop offset="1" stopColor="#7f53ac" />
                </linearGradient>
              </defs>
            </svg>
            <span>
              Booklyst{" "}
              <span className="text-base font-medium text-blue-500">
                &copy; {new Date().getFullYear()}
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-7 text-gray-600 font-medium items-center text-sm">
            <a href="#" className="hover:text-blue-600 transition">
              About
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Contact
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Privacy Policy
            </a>
            {/* Social icons */}
            <span className="ml-2 flex gap-2">
              <a href="#" aria-label="Twitter" className="hover:text-blue-400">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.633 7.997c.013.175.013.35.013.526 0 5.383-4.093 11.6-11.6 11.6-2.308 0-4.457-.675-6.271-1.844a8.214 8.214 0 0 0 6.106-1.717 4.086 4.086 0 0 1-3.808-2.834c.635.1 1.27.1 1.918-.075a4.079 4.079 0 0 1-3.274-4.008v-.05a4.11 4.11 0 0 0 1.849.517 4.084 4.084 0 0 1-1.818-3.403c0-.75.2-1.452.545-2.057A11.571 11.571 0 0 0 12.075 8.73a4.632 4.632 0 0 1-.1-.934 4.083 4.083 0 0 1 7.064-3.723 8.104 8.104 0 0 0 2.587-.984c-.282.878-.878 1.621-1.663 2.087a8.17 8.17 0 0 0 2.348-.635 8.78 8.78 0 0 1-2.046 2.147z" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-blue-700">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.94 21.949V12h3.237l.486-3.775h-3.723V6.531c0-1.072.298-1.804 1.845-1.804h1.972V1.228C17.591.995 16.517.82 15.239.82c-2.725 0-4.184 1.465-4.184 4.263v2.142H6.828V12h4.227v9.949h2.885z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zm8.5 1.5c2.276 0 4 1.724 4 4v8.5c0 2.276-1.724 4-4 4h-8.5c-2.276 0-4-1.724-4-4v-8.5c0-2.276 1.724-4 4-4h8.5zm-4.25 2A4.25 4.25 0 1 0 16.25 9.75 4.256 4.256 0 0 0 12 5.5zM12 7a2.75 2.75 0 1 1-2.75 2.75A2.753 2.753 0 0 1 12 7zm5.25 1a1.19 1.19 0 1 0 1.19 1.19A1.19 1.19 0 0 0 17.25 8z" />
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
