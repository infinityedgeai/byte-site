"use client";

import Link from "next/link";
import ArticleBadge from "@/components/ArticleBadge";
import { AlertTriangle, CheckCircle } from "lucide-react";

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
            Transforming HR and Marketing Efficiency with AI Automation
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
          <section className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-primary">Overview</h2>
            <p>
              A leading Romanian travel company with more than 250 employees faced growing
              internal operational demands across both HR and Marketing. Their teams were
              spending significant time on manual, repetitive tasks that slowed productivity
              and reduced their capacity to focus on higher-value work.
            </p>
            <p>
              Byte Engineering, in partnership with Infinity Edge AI, implemented a fully
              fledged AI chatbot to streamline operations, automate information flow, and
              reduce time spent on low-value activities.
            </p>
          </section>

          {/* Eye-catching Challenges vs Results Summary */}
          <div className="my-12 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border-2 border-rose-500/30 bg-rose-500/5 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-rose-500">Challenges</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Administrative burden</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Repetitive tasks</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Content reworking</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Inconsistent brand assets</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-emerald-500">Results</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold">2 working days saved</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Repetitive tasks removed</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Campaigns in minutes not hours</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Consistent branding</span>
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-8 border-foreground/20" />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-primary">Challenges</h2>

            <h3 className="text-xl font-semibold text-accent">
              HR: High Volume of Manual Enquiries
            </h3>
            <p>
              The HR department was fielding large numbers of routine employee information
              requests, each requiring manual attention. This created:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A heavy administrative burden</li>
              <li>Repetitive handling of the same types of questions</li>
              <li>Reduced availability for strategic HR initiatives</li>
              <li>Ongoing pressure due to the organisation&apos;s scale of 250+ employees</li>
            </ul>

            <h3 className="text-xl font-semibold text-accent mt-6">
              Marketing: Inefficient Content and Branding Workflows
            </h3>
            <p>The marketing team relied on manual processes to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Search for materials</li>
              <li>Build campaign content</li>
              <li>Update and maintain company presentations</li>
              <li>Standardise branding assets</li>
            </ul>
            <p>
              This meant tasks frequently took hours, disrupting workflow continuity and
              slowing campaign delivery.
            </p>
          </section>

          <hr className="my-8 border-foreground/20" />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-primary">Solution</h2>
            <p>
              Byte Engineering deployed a comprehensive AI chatbot solution powered by
              Infinity Edge AI&apos;s technology. The system was tailored to support both HR
              and Marketing by:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Automating employee information requests</li>
              <li>Enabling staff self-service through a conversational interface</li>
              <li>Providing quick access to approved brand assets and marketing content</li>
              <li>Simplifying the creation and update of company presentations</li>
              <li>Integrating seamlessly into existing operational workflows</li>
            </ul>
            <div className="my-8 p-6 border-l-4 border-primary bg-primary/10 rounded-r-lg">
              <p className="font-bold text-lg">
                The chatbot became a central information hub, reducing dependency on manual
                processes and unlocking team capacity.
              </p>
            </div>
          </section>

          <hr className="my-8 border-foreground/20" />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-primary">Results</h2>

            <h3 className="text-xl font-semibold text-accent">HR Efficiency Gains</h3>
            <div className="my-6 p-6 border-l-4 border-accent bg-accent/10 rounded-r-lg">
              <p className="font-bold text-lg">
                The HR team saved the equivalent of two full workdays per week, previously
                spent responding to employee queries.
              </p>
            </div>
            <p>
              Routine enquiries were resolved instantly through the chatbot, reducing
              bottlenecks and improving internal response times.
            </p>

            <h3 className="text-xl font-semibold text-accent mt-6">
              Marketing Productivity Boost
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Manual searches and material-building processes were eliminated</li>
              <li>Presentation and branding updates were significantly simplified</li>
            </ul>
            <div className="my-6 p-6 border-l-4 border-secondary bg-secondary/10 rounded-r-lg">
              <p className="font-bold text-lg">
                Tasks that previously required 1–2 hours now take 10–15 minutes, enabling
                faster campaign output and better use of team resources.
              </p>
            </div>
          </section>

          <hr className="my-8 border-foreground/20" />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-secondary">Conclusion</h2>
            <p>
              Byte Engineering&apos;s AI-driven automation delivered immediate, measurable
              improvements across HR and Marketing. By reducing manual effort and integrating
              the chatbot into daily workflows, the travel company unlocked substantial
              efficiency gains and positioned its teams to focus on strategic, high-impact
              work.
            </p>
            <div className="my-8 p-6 border-l-4 border-primary bg-primary/10 rounded-r-lg">
              <p className="font-bold text-lg">
                Byte Engineering continues to support organisations seeking operational
                excellence through intelligent automation.
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
