import { create } from "zustand";

const getInitialMode = () => {
  const persisted = localStorage.getItem("theme-mode");
  if (persisted === "dark" || persisted === "light") return persisted;
  // Prefer system dark mode
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const useThemeStore = create((set, get) => ({
  mode: typeof window !== "undefined" ? getInitialMode() : "light",
  setMode: (mode) => {
    set({ mode });
    try {
      localStorage.setItem("theme-mode", mode);
      const root = document.documentElement;
      if (mode === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
    } catch {}
  },
  toggleMode: () => {
    const next = get().mode === "dark" ? "light" : "dark";
    get().setMode(next);
  },
}));

export default useThemeStore;
