import React from "react";
import { ZapIcon, FileTextIcon, ShieldIcon } from "./Icons";

export function Features() {
  return (
    <section id="features" className="w-full py-20 border-t border-zinc-800/40 bg-[#0B0B0D]">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Section Header */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Built for efficient hunters
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 mb-16 font-normal">
          Three features to level up your reports effortlessly.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Fast */}
          <div className="flex flex-col rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-8 text-left transition-all hover:border-zinc-700 hover:bg-[#18181B]/90 shadow-xl shadow-black/40 group">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF7527] text-[#0B0B0D] shadow-lg shadow-[#FF7527]/20 transition-transform group-hover:scale-105">
              <ZapIcon className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Fast</h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
              From messy draft to structured report in &lt;10 seconds. Faster than writing the title yourself.
            </p>
          </div>

          {/* Card 2: Structured */}
          <div className="flex flex-col rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-8 text-left transition-all hover:border-zinc-700 hover:bg-[#18181B]/90 shadow-xl shadow-black/40 group">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF7527] text-[#0B0B0D] shadow-lg shadow-[#FF7527]/20 transition-transform group-hover:scale-105">
              <FileTextIcon className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Structured</h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
              Industry standard format: Summary, Severity, Steps, PoC, Impact, Remediation. Done automatically.
            </p>
          </div>

          {/* Card 3: Professional */}
          <div className="flex flex-col rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-8 text-left transition-all hover:border-zinc-700 hover:bg-[#18181B]/90 shadow-xl shadow-black/40 group">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF7527] text-[#0B0B0D] shadow-lg shadow-[#FF7527]/20 transition-transform group-hover:scale-105">
              <ShieldIcon className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Professional</h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
              Technical English, professional tone, ready to submit to HackerOne, Bugcrowd, or Intigriti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
