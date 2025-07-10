// src/store/useAdminStore.js
import { create } from "zustand";

const useAdminStore = create(() => ({
  fetchBlogById: async (id) => {
    const res = await fetch(`/api/blog/${id}`);
    if (!res.ok) throw new Error("Blog not found");
    return await res.json();
  },

  sendForUPdateBLogs: async (id, formData) => {
    const res = await fetch(`/api/blog/update/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!res.ok) throw new Error("Update failed");
    return await res.json();
  },
}));

export default useAdminStore;
