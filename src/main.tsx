import React from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App";

// Create a root.
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <NextThemesProvider
      defaultTheme="dark"
      attribute="class"
      value={{
        light: "light",
        dark: "dark",
      }}
    >
      <NextUIProvider>
        <Toaster position="top-center" richColors />
        <App />
      </NextUIProvider>
    </NextThemesProvider>
  </React.StrictMode>,
);
