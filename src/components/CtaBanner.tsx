import React from "react";
import { ArrowRightIcon } from "./Icons";

interface CtaBannerProps {
  setActiveTab: (tab: "home" | "generator") => void;
}

export function CtaBanner({ setActiveTab }: CtaBannerProps) {
  return (
    <section className="w-full py-10 px-6 bg-[#0B0B0D]">
      <div className="relative mx-auto max-w-5xl rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-[#18181B]/60 to-[#131316]/80 p-12 sm:p-20 text-center shadow-2xl shadow-black overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF7527]/10 rounded-full blur-3xl pointer-events-none" />

        <h2 className="relative text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-8 leading-[1.2]">
          True hunters spend time on <br className="hidden sm:block" />
          <span className="text-[#FF7527] bg-clip-text">recon</span>, not typing.
        </h2>

        <button
          onClick={() => setActiveTab("generator")}
          className="relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF7527] px-8 py-4 text-base font-bold text-[#0B0B0D] shadow-xl shadow-[#FF7527]/20 transition-all hover:bg-[#e06522] hover:shadow-[#FF7527]/30 active:scale-95 focus:outline-none"
        >
          Try now — it's free
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
