"use client";

import React, { useState } from "react";
import {
  FileTextIcon,
  Loader2Icon,
  CopyIcon,
  CheckIcon,
  ZapIcon,
  RefreshCwIcon,
  DownloadIcon,
} from "./Icons";
import { exportReportToPDF } from "@/utils/pdfGenerator";

export function Generator() {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [vulnType, setVulnType] = useState("");
  const [severity, setSeverity] = useState("Medium");
  const [platform, setPlatform] = useState("Generic");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Handler to fill sample data in English
  const handleFillSample = () => {
    setTitle("Stored XSS in profile bio");
    setTarget("app.example.com/profile");
    setVulnType("XSS (Cross-Site Scripting)");
    setSeverity("Medium");
    setPlatform("Generic");
    setDescription(
      "A stored XSS vulnerability exists on the Bio field of the user profile page. Input is not properly sanitized, allowing malicious scripts to execute when the profile page is visited by other users."
    );
    setSteps(
      "1. Login to the application as an attacker.\n2. Go to the /settings/profile page.\n3. Insert the following payload into the Bio field: <img src=x onerror=alert(document.cookie)>\n4. Click save changes.\n5. Visit the attacker's public profile page with a victim's account; a popup alert will execute."
    );
  };

  // Handler to generate report in English
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !target || !description || !steps) {
      alert("Please complete all required fields (*)");
      return;
    }

    setIsGenerating(true);
    setGeneratedReport(null);
    setCopied(false);

    // Simulate AI generation delay
    setTimeout(() => {
      const report = `# ${title}

**Target:** \`${target}\`
**Vulnerability Type:** ${vulnType || "N/A"}
**Severity:** ${severity}
**Platform:** ${platform}

---

## 📋 Summary
${description}

## 🛑 Vulnerability Details
The vulnerability occurs in \`${target}\` where user input is reflected or stored without sufficient sanitization or output encoding. This allows an attacker to inject arbitrary payloads.

## 👣 Steps to Reproduce
${steps}

## 💥 Proof of Concept (PoC)
When a victim visits the affected page/endpoint, the injected payload executes immediately within the context of their browser session.

## ⚠️ Impact
An attacker can exploit this vulnerability to execute arbitrary JavaScript in the context of the victim's session, potentially stealing sensitive cookies, session tokens, or performing unauthorized actions on behalf of the user.

## 🔒 Remediation
1. **Input Validation:** Implement strict allowlist-based validation on all user-supplied input.
2. **Output Encoding:** Ensure all user input is properly context-encoded (e.g., HTML entity encoding) before rendering it in the DOM.
3. **Content Security Policy (CSP):** Implement a robust CSP to restrict the sources of executable scripts.`;

      setGeneratedReport(report);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    if (!generatedReport) return;
    navigator.clipboard.writeText(generatedReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (!generatedReport) return;
    exportReportToPDF(generatedReport);
  };

  const handleReset = () => {
    setTitle("");
    setTarget("");
    setVulnType("");
    setSeverity("Medium");
    setPlatform("Generic");
    setDescription("");
    setSteps("");
    setGeneratedReport(null);
    setIsGenerating(false);
    setCopied(false);
  };

  return (
    <section className="w-full pt-12 pb-24 px-6 bg-[#0B0B0D]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            Report Generator
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 font-normal">
            Fill in rough notes on the left — let AI organize it.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-6 sm:p-8 shadow-xl backdrop-blur-sm">
            <form onSubmit={handleGenerate} className="space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    TITLE *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Stored XSS in profile bio"
                    className="w-full rounded-xl border border-zinc-800 bg-[#131316] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#FF7527] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    TARGET *
                  </label>
                  <input
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="app.example.com/profile"
                    className="w-full rounded-xl border border-zinc-800 bg-[#131316] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#FF7527] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    VULNERABILITY TYPE *
                  </label>
                  <input
                    type="text"
                    value={vulnType}
                    onChange={(e) => setVulnType(e.target.value)}
                    placeholder="XSS, SSRF, IDOR..."
                    className="w-full rounded-xl border border-zinc-800 bg-[#131316] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#FF7527] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    SEVERITY
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-[#131316] px-4 py-3 text-sm text-white focus:border-[#FF7527] focus:outline-none transition-colors appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23A1A1AA%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.65rem_auto] bg-[right_1rem_top_50%] bg-no-repeat"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  PLATFORM
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-[#131316] px-4 py-3 text-sm text-white focus:border-[#FF7527] focus:outline-none transition-colors appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23A1A1AA%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.65rem_auto] bg-[right_1rem_top_50%] bg-no-repeat"
                >
                  <option value="Generic">Generic</option>
                  <option value="HackerOne">HackerOne</option>
                  <option value="Bugcrowd">Bugcrowd</option>
                  <option value="Intigriti">Intigriti</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  DESCRIPTION *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is the bug, where is it, why is it dangerous..."
                  rows={4}
                  className="w-full rounded-xl border border-zinc-800 bg-[#131316] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#FF7527] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  STEPS TO REPRODUCE *
                </label>
                <textarea
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  placeholder="1. Login to account...\n2. Go to /settings...\n3. Input payload..."
                  rows={5}
                  className="w-full rounded-xl border border-zinc-800 bg-[#131316] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#FF7527] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleFillSample}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3.5 text-sm font-semibold text-zinc-300 hover:bg-zinc-800/80 transition-all active:scale-95 focus:outline-none"
                >
                  <ZapIcon className="h-4 w-4 text-[#FF7527]" />
                  Fill Sample Notes
                </button>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#FF7527] px-6 py-3.5 text-sm font-bold text-[#0B0B0D] shadow-lg shadow-[#FF7527]/20 transition-all hover:bg-[#e06522] hover:shadow-[#FF7527]/30 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
                >
                  {isGenerating ? (
                    <>
                      <Loader2Icon className="h-5 w-5 animate-spin" />
                      AI is Crafting Your Report...
                    </>
                  ) : (
                    "Generate Report with AI"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Preview Window */}
          <div className="rounded-2xl border border-zinc-800/80 bg-[#131316]/90 shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden text-left sticky top-24">
            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/60 bg-[#18181B]/50 px-6 py-3.5">
              <div className="flex items-center gap-2">
                <FileTextIcon className="h-4 w-4 text-zinc-400" />
                <span className="font-mono text-xs text-zinc-400 font-medium">
                  report.md
                </span>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                {generatedReport && (
                  <>
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-1 sm:gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors focus:outline-none"
                      title="Download PDF"
                    >
                      <DownloadIcon className="h-3.5 w-3.5 text-[#FF7527]" />
                      <span className="hidden sm:inline">Download PDF</span>
                      <span className="inline sm:hidden">PDF</span>
                    </button>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 sm:gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors focus:outline-none"
                      title="Copy report to clipboard"
                    >
                      {copied ? (
                        <>
                          <CheckIcon className="h-3.5 w-3.5 text-green-500" />
                          <span className="hidden sm:inline">Copied!</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                  </>
                )}
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 sm:gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors focus:outline-none"
                  title="Reset form"
                >
                  <RefreshCwIcon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div className={`p-6 sm:p-8 min-h-[500px] flex flex-col font-mono text-sm leading-relaxed text-zinc-300 ${
              !generatedReport ? "justify-center items-center" : "justify-start items-stretch"
            }`}>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center text-center p-8">
                  <Loader2Icon className="h-10 w-10 text-[#FF7527] mb-4 animate-spin" />
                  <p className="text-zinc-400 font-medium">
                    AI is analyzing the vulnerability & drafting the report...
                  </p>
                </div>
              ) : generatedReport !== null ? (
                <textarea
                  value={generatedReport}
                  onChange={(e) => setGeneratedReport(e.target.value)}
                  className="w-full min-h-[460px] bg-transparent text-zinc-300 font-mono text-sm leading-relaxed border-none outline-none focus:outline-none focus:ring-0 resize-none p-0"
                  spellCheck={false}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8">
                  <FileTextIcon className="h-12 w-12 text-zinc-700 mb-4" />
                  <p className="text-zinc-500 font-medium text-base">
                    Your report will appear here
                  </p>
                  <p className="text-zinc-600 text-xs mt-2 max-w-xs">
                    Fill out the form on the left or click "Fill Sample Notes" to see the AI magic.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
