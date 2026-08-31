"use client";

import Link from "next/link";
import ArticleBadge from "@/components/ArticleBadge";

export default function CaseStudy() {
  return (
    <article className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-block mb-8 text-primary hover:text-primary/80 transition-colors"
        >
          ← Back to Home
        </Link>

        <header className="mb-12">
          <div className="mb-4">
            <ArticleBadge type="case-study" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            How we cut a travel operator&apos;s manual workload with AI automation
          </h1>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-foreground/70">
            <div>
              <span className="font-semibold">Client:</span> Romanian Travel Company
            </div>
            <div>
              <span className="font-semibold">Partner:</span> Infinity Edge AI
            </div>
            <div>
              <span className="font-semibold">Delivered by:</span> Byte Engineering
            </div>
          </div>
          <time className="block mt-4 text-sm text-foreground/60">
            January 25, 2026
          </time>
        </header>

        <div className="max-w-none space-y-8 leading-relaxed">
          <p>
            A Romanian travel company was drowning in repetitive back-office work. We built
            an AI automation that handled it end-to-end — cutting [X hours/week] of manual
            effort and paying for itself within [Y months].
          </p>

          <p>
            The domain doesn&apos;t matter; the pattern does. The same approach applies wherever
            a team assembles reports, reconciles data, or processes documents by hand — exactly
            the workload facing renewable asset management teams today.
          </p>

          <div className="my-8 p-6 border-l-4 border-primary bg-primary/10 rounded-r-lg">
            <p className="font-bold text-lg">
              The outcome was simple: less admin, faster turnaround times, and more time for
              people to focus on service and operations.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-primary">What changed</h2>
            <p>
              We automated the repetitive workflows that were draining the team&apos;s time.
              Instead of handling the same tasks in spreadsheets, inboxes and manual checks,
              the process was routed through a structured automation that pulled information,
              validated it and completed the work end-to-end.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fewer manual handoffs between teams</li>
              <li>Lower risk of delays and data errors</li>
              <li>Time saved in reporting, admin and document processing</li>
              <li>Clearer operational visibility for managers</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-primary">Why it matters</h2>
            <p>
              This is the same challenge renewable asset managers and O&amp;M teams face every
              day: too much work collecting, checking and consolidating information, not enough
              time to act on what matters.
            </p>
            <p>
              Automation gives teams the ability to move faster without hiring more admin
              headcount. That is the real ROI: fewer hours lost to repetition, more time spent
              on operational decisions.
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            Next step
          </p>
          <h3 className="text-2xl font-bold mb-4">Book a 20-minute call</h3>
          <Link
            href="/#contact"
            className="inline-block px-5 py-3 bg-primary text-background rounded-lg font-semibold hover:bg-primary/80 transition-colors"
          >
            Book a 20-minute call
          </Link>
        </div>
      </div>
    </article>
  );
}
