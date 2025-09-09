"use client";

import React, { useEffect, useState, useRef } from "react";
import WordCloud from "react-d3-cloud-modern";

const data = [
  { text: "Byte", value: 50 },
  { text: "Engineering", value: 40 },
  { text: "AI", value: 30 },
  { text: "Dev", value: 25 },
  { text: "Software", value: 20 },
  { text: "Cloud", value: 15 },
  { text: "Services", value: 10 },
];

const fontSize = (word: { value: number }) => word.value * 2;
const rotation = () => (Math.random() > 0.5 ? 0 : 90);
const colorMapper = (word: { text: string }) => {
  const colors = ["#2563eb", "#9333ea", "#f59e0b", "#10b981"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const WordCloudComponent: React.FC<{ start: boolean }> = ({ start }) => {
  return (
    <div className="p-6 rounded-2xl items-center justify-center overflow-visible">
      <div className={`transition-opacity duration-1000 ${start ? "opacity-100" : "opacity-0"}`}>
        {start && (
          <WordCloud
            data={data}
            fontSize={fontSize}
            rotate={rotation}
            padding={4}
            font="Times"
            fontStyle="italic"
            fontWeight="bold"
            spiral="rectangular"
            fill={colorMapper}
            onWordClick={(event, d) => console.log(`onWordClick: ${d.text}`)}
            onWordMouseOver={(event, d) => console.log(`onWordMouseOver: ${d.text}`)}
            onWordMouseOut={(event, d) => console.log(`onWordMouseOut: ${d.text}`)}
          />
        )}
      </div>
    </div>
  );
};

export default function SlideThree() {
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(false);
          setTimeout(() => setStartAnimation(true), 50);
        } else {
          setStartAnimation(false);
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section ref={sectionRef} className="flex min-h-screen items-center justify-center snap-start">
      <div className="w-full max-w-4xl">
        <WordCloudComponent start={startAnimation} />
      </div>
    </section>
  );
}
