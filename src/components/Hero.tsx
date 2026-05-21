import React from "react";
import { SparklesIcon, ArrowRightIcon } from "./Icons";

interface HeroProps {
  setActiveTab: (tab: "home" | "generator") => void;
}

export function Hero({ setActiveTab }: HeroProps) {
  return (
    <section className="relative w-full pt-20 pb-16 overflow-hidden">
      {/* Background Glows & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2315_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2315_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF7527]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* AI Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 mb-8 shadow-inner backdrop-blur-sm">
          <SparklesIcon className="h-4 w-4 text-[#FF7527]" />
          <span className="text-xs font-medium text-zinc-300">
            Powered by AI · free to use
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Stop writing reports. <br />
          <span className="text-[#FF7527] bg-clip-text">Start hunting bugs.</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-3xl text-lg sm:text-xl text-zinc-400 mb-10 leading-relaxed font-normal">
          BugForge transforms your rough notes — steps, payloads, mental screenshots — into professional, submission-ready bug bounty reports in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={() => setActiveTab("generator")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#FF7527] px-8 py-4 text-base font-bold text-[#0B0B0D] shadow-xl shadow-[#FF7527]/20 transition-all hover:bg-[#e06522] hover:shadow-[#FF7527]/30 active:scale-95 focus:outline-none"
          >
            Generate your first report
            <ArrowRightIcon className="h-5 w-5" />
          </button>
          <a
            href="#features"
            className="w-full sm:w-auto flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/80 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-zinc-800/80 active:scale-95 focus:outline-none"
          >
            See how it works
          </a>
        </div>

        {/* Code Mockup Window */}
        <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-800/80 bg-[#131316]/90 shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden text-left">
          {/* Window Header */}
          <div className="flex items-center justify-between border-b border-zinc-800/60 bg-[#18181B]/50 px-6 py-3.5">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
              <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
              <div className="h-3 w-3 rounded-full bg-zinc-700" />
            </div>
            <span className="font-mono text-xs text-zinc-400 font-medium">report.md</span>
            <div className="w-12" /> {/* Spacer for balance */}
          </div>

          {/* Window Content */}
          <div className="p-6 sm:p-8 font-mono text-sm sm:text-base leading-relaxed text-zinc-300 space-y-4 overflow-x-auto">
            <div className="text-zinc-400"># Stored XSS in Profile Bio Field</div>
            <div className="text-zinc-500 mt-6">
              1. Login as attacker and navigate to <span className="text-zinc-300">/settings/profile</span>
            </div>
            <div className="text-zinc-500">
              2. Inject payload into &quot;Bio&quot;:{" "}
              <span className="text-[#FF7527] bg-[#FF7527]/10 px-1.5 py-0.5 rounded border border-[#FF7527]/20">
                &lt;img src=x onerror=alert(1)&gt;
              </span>
            </div>
            <div className="text-zinc-500">
              3. Save and visit attacker&apos;s public profile
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
