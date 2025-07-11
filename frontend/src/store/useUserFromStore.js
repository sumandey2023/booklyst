// store/useUserFromStore.js
import { create } from "zustand";
import axios from "axios";
import { axiosInstanace } from "../lib.js/axios";
const useUserFromStore = create((set, get) => ({
  form: { type: "" },
  content: [],
  images: {},
  previews: {},
  selectedBlock: "",
  typeError: false,
  hasInitializedFromLive: false,

  setForm: (form) => set({ form }),
  setPreviews: (previews) => set({ previews }),
  setSelectedData: (block) => set({ selectedBlock: block }),
  setTypeError: (error) => set({ typeError: error }),

  addData: (type, id = crypto.randomUUID(), value = "") =>
    set((state) => ({
      content: [...state.content, { type, id, value }],
    })),

  updateValue: (id, value) =>
    set((state) => ({
      content: state.content.map((block) =>
        block.id === id ? { ...block, value } : block
      ),
    })),

  handleImage: (id, file) =>
    set((state) => ({
      images: { ...state.images, [id]: file },
      content: state.content.map((block) =>
        block.id === id ? { ...block, value: URL.createObjectURL(file) } : block
      ),
    })),

  removeBlock: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.images;
      return {
        content: state.content.filter((block) => block.id !== id),
        images: rest,
      };
    }),

  resetForm: () =>
    set({
      form: { type: "" },
      content: [],
      images: {},
      previews: {},
      selectedBlock: "",
      typeError: false,
      hasInitializedFromLive: false,
    }),

  initializeFromLiveView: ({ content, previews, type }) =>
    set(() => ({
      form: { type },
      previews,
      content: content.map((block) => ({
        id: block.id || crypto.randomUUID(),
        type: block.type,
        value: block.value || "",
      })),
      hasInitializedFromLive: true,
    })),

  // ✅ New function: createUserSetup
  createUserSetup: async (formData) => {
    try {
      const res = await axiosInstanace.post(`/auth/createUserSetup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      console.error("❌ createUserSetup error:", error);
      throw error;
    }
  },
}));

export default useUserFromStore;
