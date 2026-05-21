import React from "react";
import { ZapIcon, FileTextIcon, ShieldIcon } from "./Icons";

export function Features() {
  return (
    <section id="features" className="w-full py-20 border-t border-zinc-800/40 bg-[#0B0B0D]">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Section Header */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Dibuat untuk hunter yang efisien
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 mb-16 font-normal">
          Tiga hal yang bikin laporanmu naik level tanpa effort.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Cepat */}
          <div className="flex flex-col rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-8 text-left transition-all hover:border-zinc-700 hover:bg-[#18181B]/90 shadow-xl shadow-black/40 group">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF7527] text-[#0B0B0D] shadow-lg shadow-[#FF7527]/20 transition-transform group-hover:scale-105">
              <ZapIcon className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Cepat</h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
              Dari catatan ngawur ke laporan rapi dalam &lt;10 detik. Lebih cepat dari nulis title sendiri.
            </p>
          </div>

          {/* Card 2: Terstruktur */}
          <div className="flex flex-col rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-8 text-left transition-all hover:border-zinc-700 hover:bg-[#18181B]/90 shadow-xl shadow-black/40 group">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF7527] text-[#0B0B0D] shadow-lg shadow-[#FF7527]/20 transition-transform group-hover:scale-105">
              <FileTextIcon className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Terstruktur</h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
              Format standar industri: Summary, Severity, Steps, PoC, Impact, Remediation. Otomatis.
            </p>
          </div>

          {/* Card 3: Profesional */}
          <div className="flex flex-col rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-8 text-left transition-all hover:border-zinc-700 hover:bg-[#18181B]/90 shadow-xl shadow-black/40 group">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF7527] text-[#0B0B0D] shadow-lg shadow-[#FF7527]/20 transition-transform group-hover:scale-105">
              <ShieldIcon className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Profesional</h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
              Bahasa Inggris teknis, tone profesional, siap submit ke HackerOne, Bugcrowd, Intigriti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
