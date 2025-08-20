import { create } from "zustand";
import { axiosInstanace } from "../../lib.js/axios";

const useServiceBookStore = create((set) => ({
  ServiceDetails: [],
  Servicedetails: async (_id) => {
    try {
      const res = await axiosInstanace.get(
        `/service/getSpacificServiceDetails/${_id}`
      );
      set({ ServiceDetails: res.data }); // backend returns array directly
      console.log(res.data); // log fresh data
    } catch (error) {
      console.error("Error fetching admin service data:", error);
    }
  },
  bookingrequest: async (id, details) => {
    try {
      const res = await axiosInstanace.post(`/service/bookservice`, {
        id,
        details,
      });

      console.log(res.data); // log fresh data
    } catch (error) {
      console.error("Error fetching admin service data:", error);
    }
  },
}));

export default useServiceBookStore;
