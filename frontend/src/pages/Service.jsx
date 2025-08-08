import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import serviceStore from "../store/service";
import MotionFade from "../components/motion/MotionFade";

const Service = () => {
  const { fetchData, serviceData } = serviceStore();

  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Holds backend search results
  const [backendData, setBackendData] = useState([]);
  const fetchIdRef = useRef(0); // To track latest fetch and avoid race conditions

  // Initial fetch of all services on mount
  useEffect(() => {
    const initFetch = async () => {
      setIsLoading(true);
      try {
        await fetchData();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    initFetch();
  }, [fetchData]);

  // Backend search effect with debouncing
  useEffect(() => {
    if (!search.trim()) {
      setBackendData([]);
      return;
    }

    const currentFetchId = ++fetchIdRef.current;
    setIsLoading(true);

    const debounceTimer = setTimeout(() => {
      axios
        .get("http://localhost:3000/api/service/getSerchedService", {
          params: { search },
        })
        .then((response) => {
          if (fetchIdRef.current === currentFetchId) {
            setBackendData(response.data || []);
          }
        })
        .catch((error) => {
          console.error(error);
          if (fetchIdRef.current === currentFetchId) {
            setBackendData([]);
          }
        })
        .finally(() => {
          if (fetchIdRef.current === currentFetchId) {
            setIsLoading(false);
          }
        });
    }, 400);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  // Use backend results when searching, else show all data
  const displayedServices = useMemo(() => {
    if (search.trim()) {
      return backendData;
    }
    return serviceData;
  }, [search, backendData, serviceData]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
    setBackendData([]);
  };

  // Icons reused from your previous code, unchanged:
  const SearchIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const ClearIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const FilterIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
      />
    </svg>
  );

  // Loading skeleton card
  const LoadingCard = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 animate-pulse">
      <div className="h-48 bg-slate-200 rounded-xl mb-4"></div>
      <div className="h-6 bg-slate-200 rounded-lg mb-3"></div>
      <div className="h-4 bg-slate-200 rounded-lg mb-2"></div>
      <div className="h-4 bg-slate-200 rounded-lg w-3/4"></div>
    </div>
  );

  return (
    <div className="min-h-screen z-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 dark:from-slate-800/20 dark:to-slate-700/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-slate-800/10 dark:to-slate-700/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <MotionFade className="relative z-10 max-w-4xl w-full text-center mb-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 dark:from-indigo-300 dark:via-blue-300 dark:to-purple-300 mb-4 drop-shadow-sm">
            Find Your Perfect Service
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-2 max-w-2xl mx-auto leading-relaxed">
            <span className="font-semibold text-indigo-600 dark:text-indigo-300">
              Fast, reliable, and at your fingertips.
            </span>
          </p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-6 z-50">
          <div
            className={`relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border-2 transition-all duration-300 shadow-lg ${
              isSearchFocused
                ? "border-indigo-400 shadow-xl shadow-indigo-500/20"
                : "border-slate-200 dark:border-slate-700 hover:border-indigo-300"
            }`}
          >
            {/* Search Input */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-14 h-14 text-slate-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search for services, categories, or keywords..."
                className="flex-1 h-14 bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 text-lg font-medium pr-4"
              />
              {search && (
                <button
                  onClick={clearSearch}
                  className="flex items-center justify-center w-10 h-10 mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200"
                  title="Clear search"
                >
                  <ClearIcon />
                </button>
              )}
            </div>

            {/* Search Enhancement Bar */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl z-[9999] animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <FilterIcon />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Quick Filters
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Cleaning",
                    "Plumbing",
                    "Electrical",
                    "Painting",
                    "Repair",
                    "Installation",
                  ].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSearch(filter)}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-800 hover:from-indigo-100 hover:to-blue-100 text-indigo-700 dark:text-indigo-300 font-medium rounded-xl border border-indigo-200 dark:border-slate-700 hover:border-indigo-300 transition-all duration-200 text-sm"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Results Info */}
          {search && (
            <div className="mt-4 text-center animate-fade-in">
              <p className="text-slate-600 dark:text-slate-300">
                {displayedServices.length > 0 ? (
                  <>
                    Found{" "}
                    <span className="font-bold text-indigo-600">
                      {displayedServices.length}
                    </span>{" "}
                    {displayedServices.length === 1 ? "service" : "services"}{" "}
                    for
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {" "}
                      "{search}"
                    </span>
                  </>
                ) : (
                  <>
                    No services found for{" "}
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      "{search}"
                    </span>
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </MotionFade>

      {/* Service Cards Grid */}
      <MotionFade className="relative w-full max-w-7xl" delay={0.05}>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : displayedServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {displayedServices.map((service, index) => (
              <div
                key={service._id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : search ? (
          // Empty State for Search
          <div className="text-center py-16 animate-fade-in">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
              <SearchIcon className="w-16 h-16 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">
              No Services Found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
              We couldn't find any services matching your search. Try different
              keywords or browse all available services.
            </p>
            <button
              onClick={clearSearch}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Show All Services
            </button>
          </div>
        ) : (
          // Default Loading or Empty State
          <div className="text-center py-16 animate-fade-in">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">
              Loading Services...
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Please wait while we fetch the latest services for you.
            </p>
          </div>
        )}
      </MotionFade>

      {/* Custom CSS for animations */}
      <style jsx="true">{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Service;
