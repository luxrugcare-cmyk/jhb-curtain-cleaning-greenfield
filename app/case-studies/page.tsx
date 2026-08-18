import type { Metadata } from "next";
import Link from "next/link";
import { evidenceRepository } from "@/lib/evidence-service";

export const metadata: Metadata = {
  title: "Case Studies & Measurable Evidence | JHB Curtain Cleaning",
  description:
    "Verified real-world case studies of on-site curtain and drapery restoration across Sandton, Bryanston, and Johannesburg commercial properties.",
};

export default function CaseStudiesPage() {
  const cases = evidenceRepository.getAll();

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-neutral-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-[#c99c2d] font-bold">
            First-Party Evidence &amp; Information Gain
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif mt-2 tracking-tight">
            Documented Results &amp; Case Studies
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto mt-3">
            Real Johannesburg residential and hotel restoration data. Cleaned on-site hanging on tracks with 0% fabric shrinkage and verified operational turnaround.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c) => (
            <article
              key={c.id}
              className="bg-[#141414] border border-[#c99c2d]/40 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-[#c99c2d]/20 text-[#e2be58] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {c.clientType} · {c.suburb}
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                    ✓ Verified Outcome
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white font-serif mb-4">{c.title}</h2>

                <div className="space-y-3 text-sm text-neutral-300">
                  <div className="bg-[#1a1a1a] p-3 rounded-lg border border-neutral-800">
                    <strong className="text-neutral-400 text-xs uppercase block mb-1">Fabric Specifications:</strong>
                    {c.fabricSpecs}
                  </div>

                  <div>
                    <strong className="text-[#e2be58] text-xs uppercase block mb-1">Baseline Challenge:</strong>
                    <p className="text-neutral-400 text-xs leading-relaxed">{c.baselineProblem}</p>
                  </div>

                  <div>
                    <strong className="text-[#e2be58] text-xs uppercase block mb-1">On-Site Intervention:</strong>
                    <p className="text-neutral-400 text-xs leading-relaxed">{c.intervention}</p>
                  </div>

                  <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-emerald-200 text-xs">
                    <strong className="uppercase block font-bold text-emerald-300 mb-0.5">Measurable Outcome:</strong>
                    {c.measurableOutcome} (Turnaround: {c.turnaroundTime})
                  </div>
                </div>

                {c.customerFeedback && (
                  <blockquote className="mt-4 pt-4 border-t border-neutral-800 text-xs italic text-neutral-400">
                    &ldquo;{c.customerFeedback}&rdquo;
                  </blockquote>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center">
                <span className="text-xs text-neutral-500 font-mono">Date: {c.date}</span>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c99c2d] hover:text-[#e2be58]"
                >
                  Book Assessment →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16 pt-10 border-t border-neutral-800">
          <h3 className="text-xl font-bold text-white font-serif mb-2">
            Have bespoke curtains or a commercial property requiring on-site care?
          </h3>
          <p className="text-sm text-neutral-400 mb-6">
            Stephen conducts comprehensive on-site inspections across Greater Johannesburg.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="bg-[#c99c2d] hover:bg-[#e2be58] text-[#121212] font-bold px-6 py-3.5 rounded-lg text-sm transition-all"
            >
              Request Free On-Site Assessment
            </Link>
            <a
              href="https://wa.me/27750119200?text=Hi%20Stephen,%20I'm%20looking%20for%20a%20quote%20based%20on%20your%20case%20studies."
              className="bg-[#1a1a1a] hover:bg-[#252525] border border-neutral-700 text-neutral-200 font-bold px-6 py-3.5 rounded-lg text-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
