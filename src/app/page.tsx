"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import SlideOne from "@/components/SlideOne";

gsap.registerPlugin(TextPlugin);

export default function Home() {
  const textRef = useRef<HTMLLIElement | null>(null);
  const loopRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        textRef.current.textContent = "";
        gsap.to(textRef.current, {
          text: "Our development team guides and enables you in every step of the process towards making your product vision a reality.",
          duration: 5,
          ease: "none",
        });
      }
      if (loopRef.current) {
        const el = loopRef.current;
        const words = ["Coders", "Devs", "AI"];
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

        words.forEach((word) => {
          tl.to(el, {
            text: word,
            duration: Math.max(0.4, word.length * 0.1),
            ease: "none",
          });

          tl.to({}, { duration: 0.8 });

          tl.add(() => {
            let i = word.length;
            const interval = setInterval(() => {
              el.textContent = word.slice(0, i - 1);
              i--;
              if (i === 0) clearInterval(interval);
            }, 80);
          });

          tl.to({}, { duration: (word.length * 0.08) + 0.2 });
        });
      }
    }, [textRef, loopRef]);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-y-auto snap-y snap-mandatory h-screen">
      <SlideOne textRef={textRef} loopRef={loopRef} />
    </div>
  );
}