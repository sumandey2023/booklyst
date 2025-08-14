import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import useServiceBookStore from "../store/useBookStore/useServiceBook";

const schema = z.object({
  slot: z.string().min(1, "Please select a slot"),
  time: z.string().min(1, "Time is required"),
  payment: z.string().min(1, "Choose a payment method"),
  note: z
    .string()
    .max(300, "Note must be under 300 characters")
    .optional()
    .or(z.literal("")),
});

const BookService = () => {
  const { ServiceDetails, Servicedetails } = useServiceBookStore();
  const location = useLocation();
  const navigate = useNavigate();
  const passedService = location.state?.service;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { slot: "", time: "", payment: "", note: "" },
  });

  useEffect(() => {
    if (passedService?._id) {
      Servicedetails(passedService._id);
    }
  }, [passedService?._id, Servicedetails]);

  if (!passedService || !ServiceDetails?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 px-4">
        <h2 className="text-2xl font-bold text-rose-600 mb-4">
          No service data found.
        </h2>
        <button
          className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
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
    toast.success("Booking request submitted!");
    reset();
  };

  const firstImage = content.find((item) => item.type === "image");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white/95 rounded-xl shadow-lg overflow-hidden border border-rose-100">
        {/* Service Details */}
        <div className="p-6 md:p-10 flex flex-col gap-4">
          {firstImage && (
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-rose-100">
              <img
                src={firstImage.value}
                alt="Service"
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md uppercase tracking-widest mt-2">
            {ServiceType}
          </span>

          {content.map((item) => {
            if (item.type === "title")
              return (
                <h2
                  key={item._id}
                  className="text-2xl font-extrabold text-rose-700"
                >
                  {item.value}
                </h2>
              );
            if (item.type === "subtitle")
              return (
                <h3
                  key={item._id}
                  className="text-lg font-medium text-rose-500 italic"
                >
                  {item.value}
                </h3>
              );
            if (item.type === "text")
              return (
                <p
                  key={item._id}
                  className="text-rose-900/80 text-sm md:text-base leading-relaxed"
                >
                  {item.value}
                </p>
              );
            if (item.type === "image" && item !== firstImage)
              return (
                <div
                  key={item._id}
                  className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-rose-100"
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

          <div className="flex gap-4 text-sm text-rose-600/80 mt-2">
            <span>👍 {likes.length} Likes</span>
            <span>👎 {dislikes.length} Dislikes</span>
          </div>

          {uploaderInfo && (
            <div className="mt-4 p-3 border border-rose-100 rounded-lg bg-rose-50">
              <h4 className="font-semibold text-rose-700">Service Provider</h4>
              <p className="text-rose-700/80">Name: {uploaderInfo.name}</p>
              <p className="text-rose-700/80">Email: {uploaderInfo.email}</p>
              <p className="text-rose-700/80">
                Phone: {uploaderInfo.phNo?.join(", ")}
              </p>
            </div>
          )}

          {schedule?.length > 0 && (
            <div className="mt-4 p-3 border border-rose-100 rounded-lg bg-rose-50">
              <h4 className="font-semibold text-rose-700">
                Schedule Availability
              </h4>
              {schedule[0].availability?.map((slot) => (
                <p key={slot._id} className="text-rose-700/80">
                  {slot.day}: {slot.from} - {slot.to}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Booking Form */}
        <div className="p-6 md:p-10 bg-white border-t border-rose-100">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-xl mx-auto"
          >
            <h3 className="text-lg md:text-2xl font-bold text-rose-700 mb-4">
              Book Your Slot
            </h3>

            <div>
              <label className="block text-sm font-semibold mb-1 text-rose-700">
                Select Slot
              </label>
              <select
                className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400"
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
                <p className="text-rose-600 text-sm">{errors.slot.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-rose-700">
                Time
              </label>
              <input
                type="time"
                {...register("time")}
                className="w-full px-4 py-2 border border-rose-200 rounded-lg"
              />
              {errors.time && (
                <p className="text-rose-600 text-sm">{errors.time.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-rose-700">
                Custom Note
              </label>
              <textarea
                rows={3}
                {...register("note")}
                className="w-full px-4 py-2 border border-rose-200 rounded-lg"
              />
              {errors.note && (
                <p className="text-rose-600 text-sm">{errors.note.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-rose-700">
                Payment Method
              </label>
              <select
                {...register("payment")}
                className="w-full px-4 py-2 border border-rose-200 rounded-lg"
              >
                <option value="">Select payment method</option>
                <option value="UPI">UPI</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
              </select>
              {errors.payment && (
                <p className="text-rose-600 text-sm">
                  {errors.payment.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold text-lg shadow-md hover:from-rose-500 hover:to-pink-600 transition-all"
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
