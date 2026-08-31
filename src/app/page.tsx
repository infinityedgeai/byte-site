"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import Intro from "@/components/Intro";
import ArticlesList from "@/components/ArticlesList";
import ContactForm from "@/components/ContactForm";
// import Demos from "@/components/Demos"; // Temporarily disabled - WIP

gsap.registerPlugin(TextPlugin);

export default function Home() {
  const bubblesRootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const typingRef = useRef<HTMLLIElement | null>(null);
  const loopRef = useRef<HTMLLIElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const D = (v: number) => (prefersReduced ? 0 : v);
    const STAG = prefersReduced ? 0 : 0.22;

    let mainCtx: gsap.Context | null = null;

    const preHideCtx = gsap.context(() => {
      if (listRef.current) {
        const items = Array.from(listRef.current.children) as HTMLElement[];
        gsap.set(items, { autoAlpha: 0, y: prefersReduced ? 0 : 30 });
      }
      if (typingRef.current) typingRef.current.textContent = "";
      if (loopRef.current) loopRef.current.textContent = "";
    });

    const startMain = () => {
      if (mainCtx) return;

      mainCtx = gsap.context(() => {
        if (typingRef.current) {
          gsap.to(typingRef.current, {
            text:
              "AI automation for UK renewable asset managers and O&M teams — reporting, monitoring and admin handled in minutes, not days.",
            duration: D(5),
            ease: "none",
          });
        }

        if (loopRef.current) {
          const el = loopRef.current;
          const words = ["Reporting", "Monitoring", "Operations", "Admin"];
          const loopTl = gsap.timeline({ repeat: -1, repeatDelay: D(0.8) });

          words.forEach((word) => {
            const obj = { i: word.length };

            loopTl.to(el, {
              text: word,
              duration: D(Math.max(0.8, word.length * 0.2)),
              ease: "none",
            });

            loopTl.to({}, { duration: D(2) });

            loopTl.set(obj, { i: word.length });
            loopTl.to(obj, {
              i: 0,
              duration: D(word.length * 0.08 + 0.2),
              ease: "none",
              onUpdate: () => {
                const n = Math.max(0, Math.floor(obj.i));
                el.textContent = word.slice(0, n);
              },
            });

            loopTl.set(el, { text: "" });
          });
        }

        if (listRef.current) {
          const items = Array.from(listRef.current.children) as HTMLElement[];
          gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            duration: D(0.8),
            stagger: STAG,
            ease: "power2.out",
          });
        }
      }, [typingRef, loopRef, listRef]);
    };

    const bubblesCtx = gsap.context(() => {
      const root = bubblesRootRef.current;
      if (!root) {
        startMain();
        return;
      }
      const q = gsap.utils.selector(root);
      const bubbles = q(".bubble") as HTMLElement[];

      if (!bubbles.length) {
        startMain();
        return;
      }

      gsap.set(bubbles, {
        autoAlpha: 0,
        x: -40,
        scale: 0.9,
        transformOrigin: "50% 50%",
      });

      const byX = [...bubbles].sort((a, b) => {
        const ax = a.getBoundingClientRect().left;
        const bx = b.getBoundingClientRect().left;
        return ax - bx;
      });

      gsap.timeline({ onComplete: startMain }).to(byX, {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: D(0.6),
        ease: "power2.out",
        stagger: STAG,
      });
    }, bubblesRootRef);

    return () => {
      bubblesCtx.revert();
      if (mainCtx) mainCtx.revert();
      preHideCtx.revert();
    };
  }, []);

  return (
    <div className="w-full overflow-y-auto snap-y snap-mandatory h-[calc(100vh-5rem)]">
      <Intro
        bubblesRootRef={bubblesRootRef}
        listRef={listRef}
        typingRef={typingRef}
        loopRef={loopRef}
      />

      <section id="services" className="min-h-screen flex items-center justify-center snap-start bg-background text-foreground py-20">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4">
              Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.05em]">
              Automation that cuts admin without adding complexity.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                Primary
              </p>
              <h3 className="text-2xl font-bold mb-3">Automation Pilot</h3>
              <p className="text-foreground/80 leading-relaxed">
                One workflow, automated end-to-end in 2–4 weeks. Typical targets: monthly
                performance reporting, SCADA/monitoring data consolidation, invoice
                reconciliation. Fixed scope, fixed price, measurable hours saved.
              </p>
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
              <h3 className="text-2xl font-bold mb-3">Automation Partner</h3>
              <p className="text-foreground/80 leading-relaxed">
                Ongoing: we identify, build and maintain automations across your operations.
                Monthly retainer, cancel anytime.
              </p>
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
              <h3 className="text-2xl font-bold mb-3">Custom Build</h3>
              <p className="text-foreground/80 leading-relaxed">
                Bespoke internal tools, AI agents and integrations for teams with a specific
                system in mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ArticlesList />
      {/* <Demos /> */}
      <ContactForm />
    </div>
  );
}
