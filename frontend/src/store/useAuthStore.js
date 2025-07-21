// store/useScheduleStore.js
import { create } from "zustand";
import axios from "axios";
import { axiosInstanace } from "../lib.js/axios";
const useAuthStore = create((set, get) => ({
  Auth: null,
  isAlradyCreate: false,
  clerk_auth: async (payload) => {
    console.log("brfore call", get().Auth);
    let output = await axiosInstanace.post("/Auth/clerk-auth", { payload });
    set({ Auth: output.data.email });
    console.log("after call", get().Auth);
    return output;
  },

  SignOut: async (payload) => {
    try {
      set({ Auth: null });
      console.log("auth is", get().Auth);
      let output = await axiosInstanace.post("/Auth/signOut");
      set({ Auth: null });
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
