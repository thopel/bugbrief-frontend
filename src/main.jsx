import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <App />
      <Footer className="absolute bottom-0 w-full" />
    </div>
  </BrowserRouter>
);
