"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import SlideOne from "@/components/SlideOne";
import SlideTwo from "@/components/SlideTwo";
import SlideFour from "@/components/SlideFour";
import SlideFive from "@/components/SlideFive";
import SlideThree from "@/components/SlideThree";

gsap.registerPlugin(TextPlugin);

export default function Home() {
  const bubblesRootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const typingRef = useRef<HTMLLIElement | null>(null);
  const loopRef = useRef<HTMLLIElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const slides = [
    <SlideOne
      key="slide-1"
      bubblesRootRef={bubblesRootRef}
      listRef={listRef}
      typingRef={typingRef}
      loopRef={loopRef}
    />,
    <SlideTwo key="slide-2" />,
    <SlideThree key="slide-3" />,
    <SlideFour key="slide-4" />,
    <SlideFive key="slide-5" />
  ];

  const totalSlides = slides.length;

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
              "Our development team guides and enables you in every step of the process towards making your product vision a reality.",
            duration: D(5),
            ease: "none",
          });
        }

        if (loopRef.current) {
          const el = loopRef.current;
          const words = ["Coders", "Devs", "AI"];
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const slideIndex = Math.round(scrollPosition / window.innerHeight);
      setCurrentSlide(slideIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full overflow-y-auto h-screen bg-black text-white scroll-smooth snap-y snap-mandatory scrollbar-hide"
    >
      {slides}
    </div>
  );
}
