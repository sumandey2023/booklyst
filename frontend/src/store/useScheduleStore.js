import { create } from "zustand";
import { axiosInstanace } from "../lib.js/axios"; // Adjust if needed

const useScheduleStore = create((set, get) => ({
  authorName: "",
  authorEmail: "",
  serviceCharge: "", // Replaced timeLimit
  availability: [],

  setAuthorInfo: ({ name, email }) =>
    set({ authorName: name, authorEmail: email }),

  setServiceCharge: (value) => set({ serviceCharge: value }),

  addAvailabilitySlot: (slot) =>
    set((state) => ({ availability: [...state.availability, slot] })),

  removeAvailabilitySlot: (index) =>
    set((state) => ({
      availability: state.availability.filter((_, i) => i !== index),
    })),

  updateAvailabilitySlot: (index, updatedSlot) =>
    set((state) => {
      const updated = [...state.availability];
      updated[index] = updatedSlot;
      return { availability: updated };
    }),

  submitSchedule: async () => {
    const { authorName, authorEmail, serviceCharge, availability } = get();
    const payload = {
      name: authorName,
      email: authorEmail,
      serviceCharge,
      availability,
    };

    await axiosInstanace.post("/auth/schedule", payload);
  },

  resetSchedule: () =>
    set({
      authorName: "",
      authorEmail: "",
      serviceCharge: "",
      availability: [],
    }),
}));

export default useScheduleStore;
