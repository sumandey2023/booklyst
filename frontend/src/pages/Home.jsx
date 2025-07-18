import React from "react";
import EcommerceComponent from "../components/EcommerceComponent";
import ServiceComponent from "../components/ServiceComponet";
import ResturantComponent from "../components/ResturantComponent";
import ResortComponent from "../components/ResortComponent";

// Optional: Dummy carousel banners
const banners = [
  {
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    text: "Big Summer Sale! Up to 50% off on select products.",
  },
  {
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    text: "Book Home Services Instantly – Trusted Professionals.",
  },
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    text: "Reserve Your Table at Top Restaurants.",
  },
];

function Carousel() {
  const [current, setCurrent] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(
      () => setCurrent((c) => (c + 1) % banners.length),
      3500
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden shadow-lg mb-10">
      {banners.map((banner, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={banner.img}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-xl md:text-3xl font-semibold drop-shadow-lg text-center px-4">
              {banner.text}
            </span>
          </div>
        </div>
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col scroll-smooth">
      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-20 gap-10">
        <div className="flex-1 flex flex-col items-start animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-800 leading-tight drop-shadow">
            All-in-One Platform for <br />
            <span className="text-blue-500">Shopping, Booking & More</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Discover, shop, and book everything you need – from products to
            services, restaurants, and resorts – all in one place.
          </p>
          <a
            href="#features"
            className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition text-lg font-semibold"
          >
            Get Started
          </a>
        </div>
        <div className="flex-1 flex justify-center animate-fade-in">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="All-in-One Platform"
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover"
          />
        </div>
      </section>

      {/* Carousel/Banner */}
      <section className="px-6 md:px-16">
        <Carousel />
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 md:px-16 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-800 animate-fade-in-up">
          Explore Our Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="transition-transform duration-300 hover:-translate-y-2 animate-fade-in-up">
            <EcommerceComponent />
          </div>
          <div className="transition-transform duration-300 hover:-translate-y-2 animate-fade-in-up delay-100">
            <ServiceComponent />
          </div>
          <div className="transition-transform duration-300 hover:-translate-y-2 animate-fade-in-up delay-200">
            <ResturantComponent />
          </div>
          <div className="transition-transform duration-300 hover:-translate-y-2 animate-fade-in-up delay-300">
            <ResortComponent />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 bg-white/80 backdrop-blur-md border-t border-blue-100 py-8 px-6 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-blue-800 font-bold text-lg">
            Booklyst &copy; {new Date().getFullYear()}
          </div>
          <div className="flex gap-6 text-gray-600">
            <a href="#" className="hover:text-blue-600 transition">
              About
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Contact
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
