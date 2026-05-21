"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CtaBanner } from "@/components/CtaBanner";
import { Generator } from "@/components/Generator";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "generator">("home");

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0D] text-white selection:bg-[#FF7527] selection:text-black">
      {/* Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        {activeTab === "home" ? (
          <div className="w-full flex flex-col items-center">
            <Hero setActiveTab={setActiveTab} />
            <Features />
            <CtaBanner setActiveTab={setActiveTab} />
          </div>
        ) : (
          <Generator />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
