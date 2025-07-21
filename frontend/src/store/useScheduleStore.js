// store/useScheduleStore.js
import { create } from "zustand";
import { axiosInstanace } from "../lib.js/axios";

const useScheduleStore = create((set, get) => ({
  authorName: "",
  authorEmail: "",
  serviceCharge: "",
  availability: [],
  isAlradySchedule: false,
  setAuthorInfo: ({ name, email }) =>
    set({ authorName: name, authorEmail: email }),

  setServiceCharge: (value) => set({ serviceCharge: value }),

  setAvailability: (slots) => set({ availability: slots }),

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

  submitSchedule: async (blogId = null) => {
    const { authorName, authorEmail, serviceCharge, availability } = get();
    const payload = {
      name: authorName,
      email: authorEmail,
      serviceCharge,
      availability,
    };
    let v = get().isAlradySchedule;
    if (blogId || v) {
      await axiosInstanace.put('/auth/schedule', payload); // update existing
    } else {
      await axiosInstanace.post("/auth/schedule", payload); // create new
    }
  },

  resetSchedule: () =>
    set({
      authorName: "",
      authorEmail: "",
      serviceCharge: "",
      availability: [],
    }),

  isalradyschedule: async () => {
    try {
      const res = await axiosInstanace.get(`/auth/alradyschedule`);
      set({ isAlradySchedule: res.data.isAlradySchedule });
    } catch (error) {
      console.error("❌ createUserSetup error:", error);
      throw error;
    }
  },
}));

export default useScheduleStore;
