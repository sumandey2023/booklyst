// store/useScheduleStore.js
import { create } from "zustand";
import { axiosInstanace } from "../lib.js/axios";
const serviceStore = create((set, get) => ({
  serviceData: [],
  fetchData: async () => {
    try {
      const response = await axiosInstanace.get("/service/getServiceDetails");
      set({ serviceData: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching service data:", error);
      throw error;
    }
  },
}));

export default serviceStore;
