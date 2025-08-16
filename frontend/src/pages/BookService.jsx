import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";
import useServiceBookStore from "../store/useBookStore/useServiceBook";

const schema = z.object({
  slot: z.string().min(1, "Please select a slot"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  phone: z.string().min(10, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  payment: z.string().min(1, "Choose a payment method"),
  note: z
    .string()
    .max(300, "Note must be under 300 characters")
    .optional()
    .or(z.literal("")),
});

const BookService = () => {
  const { ServiceDetails, Servicedetails } = useServiceBookStore();
  const locationHook = useLocation();
  const navigate = useNavigate();
  const passedService = locationHook.state?.service;

  const [phoneValid, setPhoneValid] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      slot: "",
      date: "",
      time: "",
      phone: "",
      location: "",
      payment: "",
      note: "",
    },
  });

  const phoneValue = watch("phone");

  useEffect(() => {
    if (phoneValue && phoneValue.length >= 10) {
      const checkPhone = async () => {
        try {
          const { data } = await axios.post("/api/validate-phone", {
            phone: phoneValue,
          });
          setPhoneValid(data.valid);
        } catch {
          setPhoneValid(false);
        }
      };
      checkPhone();
    }
  }, [phoneValue]);

  useEffect(() => {
    if (passedService?._id) {
      Servicedetails(passedService._id);
    }
  }, [passedService?._id, Servicedetails]);

  if (!passedService || !ServiceDetails?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
        <h2 className="text-2xl font-bold mb-4">No service data found.</h2>
        <button
          className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    ServiceType,
    content = [],
    likes = [],
    dislikes = [],
    schedule = [],
    uploader = [],
  } = ServiceDetails[0] || {};
  const uploaderInfo = uploader[0] || {};

  const onSubmit = async (formData) => {
    try {
      await axios.post("/api/book-service", {
        ...formData,
        serviceId: passedService._id,
      });
      toast.success("Booking request submitted!");
      reset();
    } catch {
      toast.error("Booking failed, try again.");
    }
  };

  const firstImage = content.find((item) => item.type === "image");

  return (
    <div className="min-h-screen w-full bg-black px-4 py-8 text-white">
      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-xl shadow-lg overflow-hidden border border-zinc-700">
        {/* Service Header */}
        <div className="p-6 md:p-10 border-b border-zinc-700 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-rose-400">
            {content.find((c) => c.type === "title")?.value || "Service"}
          </h1>
          <span className="inline-flex items-center px-4 py-1 mt-3 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md uppercase tracking-widest">
            {ServiceType}
          </span>
        </div>

        {/* Service Details */}
        <div className="p-6 md:p-10 flex flex-col gap-4">
          {firstImage && (
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-zinc-700">
              <img
                src={firstImage.value}
                alt="Service"
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          {content.map((item) => {
            if (item.type === "subtitle")
              return (
                <h3
                  key={item._id}
                  className="text-lg font-medium text-rose-300 italic"
                >
                  {item.value}
                </h3>
              );
            if (item.type === "text")
              return (
                <p
                  key={item._id}
                  className="text-gray-300 text-sm md:text-base leading-relaxed"
                >
                  {item.value}
                </p>
              );
            if (item.type === "image" && item !== firstImage)
              return (
                <div
                  key={item._id}
                  className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-zinc-700"
                >
                  <img
                    src={item.value}
                    alt="Service Extra"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              );
            return null;
          })}

          {/* Likes / Dislikes */}
          <div className="flex gap-4 text-sm text-gray-400 mt-2">
            <span>👍 {likes.length} Likes</span>
            <span>👎 {dislikes.length} Dislikes</span>
          </div>

          {/* Provider Info */}
          {uploaderInfo && (
            <div className="mt-4 p-3 border border-zinc-700 rounded-lg bg-zinc-800">
              <h4 className="font-semibold text-white">Service Provider</h4>
              <p className="text-gray-300">Name: {uploaderInfo.name}</p>
              <p className="text-gray-300">Email: {uploaderInfo.email}</p>
              <p className="text-gray-300">
                Phone: {uploaderInfo.phNo?.join(", ")}
              </p>
            </div>
          )}

          {/* Schedule */}
          {schedule?.length > 0 && (
            <div className="mt-4 p-3 border border-zinc-700 rounded-lg bg-zinc-800">
              <h4 className="font-semibold text-white">
                Schedule Availability
              </h4>
              {schedule[0].availability?.map((slot) => (
                <p key={slot._id} className="text-gray-300">
                  {slot.day}: {slot.from} - {slot.to}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Booking Form */}
        <div className="p-6 md:p-10 bg-zinc-950 border-t border-zinc-700">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-xl mx-auto"
          >
            <h3 className="text-lg md:text-2xl font-bold mb-4 text-center">
              Book Your Slot
            </h3>

            {/* Slot */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Select Slot
              </label>
              <select
                className="w-full px-4 py-2 border border-zinc-700 rounded-lg bg-zinc-800 text-white focus:ring-2 focus:ring-rose-500"
                {...register("slot")}
              >
                <option value="">Choose a slot</option>
                {schedule[0]?.availability?.map((slot) => (
                  <option
                    key={slot._id}
                    value={`${slot.day} ${slot.from} - ${slot.to}`}
                  >
                    {slot.day} ({slot.from} - {slot.to})
                  </option>
                ))}
              </select>
              {errors.slot && (
                <p className="text-rose-400 text-sm">{errors.slot.message}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold mb-1">Date</label>
              <input
                type="date"
                {...register("date")}
                className="w-full px-4 py-2 border border-zinc-700 rounded-lg bg-zinc-800 text-white"
              />
              {errors.date && (
                <p className="text-rose-400 text-sm">{errors.date.message}</p>
              )}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold mb-1">Time</label>
              <input
                type="time"
                {...register("time")}
                className="w-full px-4 py-2 border border-zinc-700 rounded-lg bg-zinc-800 text-white"
              />
              {errors.time && (
                <p className="text-rose-400 text-sm">{errors.time.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-zinc-700 rounded-lg bg-zinc-800 text-white"
              />
              {errors.phone && (
                <p className="text-rose-400 text-sm">{errors.phone.message}</p>
              )}
              {phoneValid === true && (
                <p className="text-green-400 text-sm">✅ Phone is valid</p>
              )}
              {phoneValid === false && (
                <p className="text-red-400 text-sm">❌ Invalid phone</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Location
              </label>
              <input
                type="text"
                {...register("location")}
                placeholder="Enter your location"
                className="w-full px-4 py-2 border border-zinc-700 rounded-lg bg-zinc-800 text-white"
              />
              {errors.location && (
                <p className="text-rose-400 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Custom Note
              </label>
              <textarea
                rows={3}
                {...register("note")}
                placeholder="Write a note (optional)"
                className="w-full px-4 py-2 border border-zinc-700 rounded-lg bg-zinc-800 text-white"
              />
              {errors.note && (
                <p className="text-rose-400 text-sm">{errors.note.message}</p>
              )}
            </div>

            {/* Payment */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Payment Method
              </label>
              <select
                {...register("payment")}
                className="w-full px-4 py-2 border border-zinc-700 rounded-lg bg-zinc-800 text-white"
              >
                <option value="">Select payment method</option>
                <option value="UPI">UPI</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
              </select>
              {errors.payment && (
                <p className="text-rose-400 text-sm">
                  {errors.payment.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-700 text-white font-bold text-lg shadow-md hover:from-rose-700 hover:to-pink-800 transition-all"
            >
              {isSubmitting ? "Submitting..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookService;
