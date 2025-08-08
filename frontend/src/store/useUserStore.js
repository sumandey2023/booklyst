// src/store/useUserStore.js
import { create } from "zustand";
import { axiosInstanace } from "../lib.js/axios";

const useUserStore = create((set) => ({
  userData: [],

  // Fetch user details from backend, optionally with Bearer token header
  fetchUserData: async (token) => {
    try {
      const res = await axiosInstanace.get("/user/getUserData", {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      });

      set({ userData: res.data });
      return res.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },

  // Clear any cached user data
  clearUserData: () => set({ userData: [] }),
}));

export default useUserStore;
