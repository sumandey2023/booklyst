// store/useScheduleStore.js
import { create } from "zustand";
import axios from "axios";
import { axiosInstanace } from "../lib.js/axios";
import Cookies from "js-cookie";

const useAuthStore = create((set, get) => ({
  Auth: null,
  isAlradyCreate: false,
  token: null,

  // 🔐 Function to get cookie from backend
  getCookieFromBackend: async (email, userId) => {
    try {
      const response = await axiosInstanace.get("/Auth/send-cookie");

      // Store token in state
      set({ token: response.data.token });
      console.log("token", response.data.token);

      console.log("✅ Cookie received from backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error getting cookie from backend:", error);
      throw error;
    }
  },

  clerk_auth: async (payload) => {
    console.log("brfore call", get().Auth);
    let output = await axiosInstanace.post("/Auth/clerk-auth", { payload });
    set({ Auth: output.data.email });
    console.log("after call", get().Auth);

    // 🔐 Get cookie from backend after successful authentication
    if (output.data.email) {
      try {
        await get().getCookieFromBackend(output.data.email, payload.clerkId);
      } catch (error) {
        console.error("❌ Error getting cookie after auth:", error);
      }
    }

    return output;
  },

  SignOut: async (payload) => {
    try {
      set({ Auth: null, token: null });
      console.log("auth is", get().Auth);
      let output = await axiosInstanace.post("/Auth/signOut");
      set({ Auth: null, token: null });

      // 🔐 Clear cookie on logout
      get().clearCookie();

      console.log(get().Auth);
      return output;
    } catch (err) {
      console.error(
        "Logout error:",
        err.response?.data?.message || err.message
      );

      return null;
    }
  },

  isalradycreate: async () => {
    try {
      const res = await axiosInstanace.get(`/auth/alradycreate`);
      set({ isAlradyCreate: res.data.alreadyCreated });
    } catch (error) {
      console.error("❌ createUserSetup error:", error);
      throw error;
    }
  },
}));

export default useAuthStore;
