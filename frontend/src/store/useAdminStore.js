// src/store/useAdminStore.js
import { create } from "zustand";
import { axiosInstanace } from "../lib.js/axios";

const useAdminStore = create((set) => ({
  serviceAdminData: [],

  fetchServiceAdminData: async () => {
    try {
      console.log("hi");
      const res = await axiosInstanace.get("/admin/fetchserviceadmindata");
      set({ serviceAdminData: res.data });
    } catch (error) {
      console.error("Error fetching admin service data:", error);
    }
  },
}));

export default useAdminStore;
