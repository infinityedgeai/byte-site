"use client";

import React, { RefObject } from "react";
import { FileText, Palette, Monitor, Bug, Upload } from "lucide-react";
import Link from "next/link";

interface IntroProps {
  bubblesRootRef: RefObject<HTMLDivElement | null>;
  listRef: RefObject<HTMLUListElement | null>;
  typingRef: RefObject<HTMLLIElement | null>;
  loopRef: RefObject<HTMLLIElement | null>;
}

export default function Intro({
  bubblesRootRef,
  listRef,
  typingRef,
  loopRef,
}: IntroProps) {
  const bubbles = [
    {
      key: "req",
      label: "Requirement Analysis",
      Icon: FileText,
      border: "border-pink-500/80",
      iconColor: "text-pink-400",
      aria: "Requirement Analysis",
    },
    {
      key: "design",
      label: "Product Design",
      Icon: Palette,
      border: "border-rose-400/80",
      iconColor: "text-rose-400",
      aria: "Product Design",
    },
    {
      key: "dev",
      label: "Product Development",
      Icon: Monitor,
      border: "border-yellow-400/80",
      iconColor: "text-yellow-400",
      aria: "Product Development",
    },
    {
      key: "qa",
      label: "Testing & Integration",
      Icon: Bug,
      border: "border-lime-400/80",
      iconColor: "text-lime-400",
      aria: "Testing and Integration",
    },
    {
      key: "deploy",
      label: "Deployment & Release",
      Icon: Upload,
      border: "border-cyan-400/80",
      iconColor: "text-cyan-400",
      aria: "Deployment and Release",
    },
  ] as const;

  return (
    <section className="h-screen flex items-center justify-center snap-start bg-background text-foreground">
      <div className="font-sans min-h-screen w-full p-8 sm:p-20 grid grid-rows-[auto_1fr] gap-12 antialiased">
        <main className="mx-auto w-full max-w-6xl">
          <div
            ref={bubblesRootRef}
            className="mb-12 w-full flex items-center justify-between gap-6 flex-wrap"
          >
            {bubbles.map(({ key, label, Icon, border, iconColor, aria }) => (
              <div
                key={key}
                aria-label={aria}
                className="bubble flex flex-col items-center"
              >
                <div
                  className={`w-28 h-28 rounded-full border-4 ${border} grid place-items-center`}
                >
                  <Icon className={`w-12 h-12 ${iconColor}`} aria-hidden="true" />
                </div>
                <span className="mt-3 text-sm font-semibold text-foreground/90 text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <ul
            ref={listRef}
            className="font-mono list-inside text-sm/6 text-center sm:text-left max-w-3xl mx-auto sm:mx-0"
          >
            <li className="mb-5 tracking-[0.3em] uppercase">
              <span className="text-primary font-bold">Software Development</span> Services.
            </li>

            <li
              ref={typingRef}
              className="mb-2 tracking-[-.01em] relative after:content-[''] after:inline-block after:w-[1px] after:h-[1em] after:align-[-0.2em] after:ml-1 after:bg-current after:animate-pulse"
              style={{ whiteSpace: "pre-wrap" }}
            />

            <li
              ref={loopRef}
              className="mb-2 tracking-[-.01em] relative after:content-[''] after:inline-block after:w-[1px] after:h-[1em] after:align-[-0.2em] after:ml-1 after:bg-current after:animate-pulse"
              style={{ whiteSpace: "pre-wrap" }}
            />
          </ul>
          <Link
            href="/blog/5-annoying-tasks"
            className="inline-block mt-8 px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-primary/80 transition-colors"
          >
            Read: The 5 Most Annoying Tasks in Every Business
          </Link>
        </main>
      </div>
    </section>
  );
}
