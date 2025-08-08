import React, { useMemo, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline, useMediaQuery } from "@mui/material";
import useThemeStore from "../../store/useThemeStore";

const MuiThemeProvider = ({ children }) => {
  const { mode, setMode } = useThemeStore();

  // Sync initial mode with system if nothing persisted
  useEffect(() => {
    if (!localStorage.getItem("theme-mode")) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setMode(prefersDark ? "dark" : "light");
    }
  }, [setMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === "dark" ? "#7c9cff" : "#4f46e5" },
          background: {
            default: mode === "dark" ? "#0b1220" : "#f8fafc",
            paper: mode === "dark" ? "#0f172a" : "#ffffff",
          },
        },
        shape: { borderRadius: 14 },
        typography: {
          fontFamily: [
            "Inter",
            "ui-sans-serif",
            "system-ui",
            "-apple-system",
            "Segoe UI",
            "Roboto",
            "Helvetica Neue",
            "Arial",
            "Noto Sans",
            "sans-serif",
          ].join(", "),
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
