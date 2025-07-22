import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookService = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  // Form state
  const [slot, setSlot] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [payment, setPayment] = useState("");

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          No service data found.
        </h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const { ServiceType, content, createdAt } = service;
  const title = content.find((item) => item.type === "title")?.value || "";
  const subtitle =
    content.find((item) => item.type === "subtitle")?.value || "";
  const text = content.find((item) => item.type === "text")?.value || "";
  const imageUrl = content.find((item) => item.type === "image")?.value || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      JSON.stringify(
        {
          ServiceType,
          title,
          subtitle,
          text,
          slot,
          note,
          date,
          time,
          payment,
        },
        null,
        2
      )
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white px-0 md:px-6 py-0 md:py-8">
      <div className="w-full h-full max-w-4xl bg-white/90 rounded-none md:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden md:my-8 md:h-auto">
        {/* Service Details (Left) */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-blue-200/60 to-purple-200/40 p-6 md:p-10 gap-4">
          <div className="w-full max-w-xs md:max-w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-blue-100 bg-white flex items-center justify-center">
            <img
              src={imageUrl}
              alt="Service"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg uppercase tracking-widest mt-2">
            {ServiceType}
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-blue-800 leading-tight text-center mt-2">
            {title}
          </h2>
          {subtitle && (
            <h3 className="text-base md:text-lg font-medium text-blue-600 italic text-center">
              {subtitle}
            </h3>
          )}
          <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center mb-2">
            {text}
          </p>
          <div className="text-xs text-gray-400 mb-2 text-center">
            Posted on:{" "}
            {new Date(createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
        {/* Booking Form (Right) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-10 bg-white">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full max-w-md mx-auto"
          >
            <h3 className="text-lg md:text-2xl font-bold text-blue-700 mb-4 text-center">
              Book Your Slot
            </h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Select Slot
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                required
              >
                <option value="">Choose a slot</option>
                <option value="Morning">Morning (8am - 12pm)</option>
                <option value="Afternoon">Afternoon (12pm - 4pm)</option>
                <option value="Evening">Evening (4pm - 8pm)</option>
              </select>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Custom Note
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Add any special instructions..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                required
              >
                <option value="">Select payment method</option>
                <option value="UPI">UPI</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookService;
