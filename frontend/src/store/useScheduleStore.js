// store/useScheduleStore.js
import { create } from "zustand";
import axios from "axios";
import { axiosInstanace } from "../lib.js/axios";
const useScheduleStore = create((set, get) => ({
  authorName: "",
  authorEmail: "",
  timeLimit: 50,
  availability: [],

  setAuthorInfo: ({ name, email }) =>
    set({ authorName: name, authorEmail: email }),

  setTimeLimit: (limit) => set({ timeLimit: limit }),

  addAvailabilitySlot: (slot) =>
    set((state) => ({
      availability: [...state.availability, slot],
    })),

  removeAvailabilitySlot: (index) =>
    set((state) => ({
      availability: state.availability.filter((_, i) => i !== index),
    })),

  resetSchedule: () =>
    set({
      authorName: "",
      authorEmail: "",
      timeLimit: 50,
      availability: [],
    }),

  // ✅ SEND TO BACKEND FROM STORE
  submitSchedule: async () => {
    const { timeLimit, availability } = get();
    console.log(timeLimit, availability);
    const payload = {
      timeLimit: `${timeLimit} minutes`,
      availability,
    };
    console.log("hi i am bibek ");
    const res = await axiosInstanace.post("/auth/schedule", payload);
    return res.data;
  },

  updateAvailabilitySlot: (index, newSlot) =>
    set((state) => {
      const updated = [...state.availability];
      updated[index] = newSlot;
      return { availability: updated };
    }),

  removeAvailabilitySlot: (index) =>
    set((state) => ({
      availability: state.availability.filter((_, i) => i !== index),
    })),
}));

export default useScheduleStore;
