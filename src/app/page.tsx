'use client'; 

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const textRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
        }
      );
    }
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ul
          ref={textRef}
          className="font-mono list-inside text-sm/6 text-center sm:text-left"
        >
          <li className="mb-5 tracking-[0.3em]">
            Software Development Services.
          </li>
          <li className="mb-2 tracking-[-.01em]">
            Our development team guides and enables you in every step of the
            process towards making your product vision a reality.
          </li>
        </ul>
      </main>
    </div>
  );
}
