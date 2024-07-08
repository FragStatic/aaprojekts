import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <main className="h-[80%] w-screen">
        <Routes>
          <Route index element={<Home />} />
          <Route path="about-me" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
