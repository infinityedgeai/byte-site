"use client";

import React, { RefObject } from "react";

interface SlideOneProps {
  textRef: RefObject<HTMLLIElement | null>;
  loopRef: RefObject<HTMLLIElement | null>;
}

export default function SlideOne({ textRef, loopRef }: SlideOneProps) {
  return (
    <section className="h-screen flex items-center justify-center snap-start">
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <ul className="font-mono list-inside text-sm/6 text-center sm:text-left">
            <li className="mb-5 tracking-[0.3em]">
              Software Development Services.
            </li>
            <li
              ref={textRef}
              className="mb-2 tracking-[-.01em] relative after:content-[''] after:inline-block after:w-[1px] after:h-[1em] after:align-[-0.2em] after:ml-1 after:bg-current after:animate-pulse"
              style={{ whiteSpace: "pre-wrap" }}
            />
            <li
              ref={loopRef}
              className="mb-2 tracking-[-.01em] relative after:content-[''] after:inline-block after:w-[1px] after:h-[1em] after:align-[-0.2em] after:ml-1 after:bg-current after:animate-pulse"
              style={{ whiteSpace: "pre-wrap" }}
            />
          </ul>
        </main>
      </div>
    </section>
  );
}