"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#1A1A1A",
          color: "#FFFFFF",
          border: "1px solid #2AADA8",
        },
      }}
    />
  );
}
