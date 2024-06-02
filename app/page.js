"use client";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HeroPage from "./pages/hero/page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function Home() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroPage />} />
      </Routes>
      
    </BrowserRouter>
  );
}
