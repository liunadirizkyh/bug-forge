import React from "react";
import { BugIcon } from "./Icons";

interface NavbarProps {
  activeTab: "home" | "generator";
  setActiveTab: (tab: "home" | "generator") => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-[#0B0B0D]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF7527] text-[#0B0B0D] transition-transform group-hover:scale-105 shadow-lg shadow-[#FF7527]/20">
            <BugIcon className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Bug<span className="text-[#FF7527]">Forge</span>
          </span>
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab("home")}
            className={`text-sm font-medium transition-colors hover:text-white focus:outline-none ${
              activeTab === "home" ? "text-white" : "text-zinc-400"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("generator")}
            className="flex items-center justify-center rounded-xl bg-[#FF7527] px-5 py-2.5 text-sm font-semibold text-[#0B0B0D] shadow-lg shadow-[#FF7527]/20 transition-all hover:bg-[#e06522] hover:shadow-[#FF7527]/30 active:scale-95 focus:outline-none"
          >
            Buka Generator
          </button>
        </nav>
      </div>
    </header>
  );
}
