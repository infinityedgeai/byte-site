"use client";

import React, { useEffect, useState, useRef } from "react";
import WordCloud from "react-d3-cloud-modern";
import seedrandom from "seedrandom";

const rng = seedrandom("test-seed"); // 👈 use a fixed seed during tests
const data = [
  { text: "Byte" },
  { text: "Engineering"},
  { text: "AI"},
  { text: "Dev" },
  { text: "Software" },
  { text: "Cloud" },
  { text: "Services" },
  { text: "Ser" },
  { text: "vices" },
  { text: "Cloudy" },
  { text: "Development" },
  { text: "Byte Engineering" },
  { text: "AI Solutions" },
  { text: "Software Dev" },
  { text: "Cloud Services" },
];

type MyWord = {
  text: string;
  value: number;
  fontSize: number;
  rotation: number;
  color: string;
};

const WORDCLOUD_PADDING = 4;

const generateWordData = (): MyWord[] =>
  data.map((word) => ({
    ...word,
    value: 1,
    rotation: rng() > 0.5 ? 0 : 90,
    color: ["#2563eb", "#9333ea", "#f59e0b", "#10b981"][
      Math.floor(rng() * 4)
    ],
    fontSize: Math.floor(rng() * (80 - 5 + 1)) + 20,
  }));

type WordBounds = { x: number; y: number; width: number; height: number };

function isWordOutOfBounds(word: WordBounds, containerWidth: number, containerHeight: number) {
  return (
    word.x - word.width / 2 < 0 ||
    word.x + word.width / 2 > containerWidth ||
    word.y - word.height / 2 < 0 ||
    word.y + word.height / 2 > containerHeight
  );
}

function validateWords(words: MyWord[], width: number, height: number): MyWord[] {
  let valid = false;
  let newWords = [...words];

  while (!valid) {
    valid = true;
    newWords = newWords.map((word) => ({
      ...word,
      rotation: Math.random() > 0.5 ? 0 : 90,
    }));
    for (const word of newWords) {
      const wordWidth = word.fontSize * word.text.length * 0.6; 
      const wordHeight = word.fontSize;
      const x = Math.random() * (width - wordWidth) + wordWidth / 2;
      const y = Math.random() * (height - wordHeight) + wordHeight / 2;
      if (isWordOutOfBounds({ x, y, width: wordWidth, height: wordHeight }, width, height)) {
        valid = false;
        break;
      }
    }
  }
  return newWords;
}

const WordCloudComponent: React.FC<{
  start: boolean;
  parentRef: React.RefObject<HTMLElement | null>;
}> = ({ start, parentRef }) => {
  const [dimensions, setDimensions] = useState({ width: 500, height: 300 });
  const [words, setWords] = useState<MyWord[]>(generateWordData());

  useEffect(() => {
  if (start && parentRef.current) {
    const containerWidth = parentRef.current.clientWidth - WORDCLOUD_PADDING * 2;
    const containerHeight = parentRef.current.clientHeight - 150 - WORDCLOUD_PADDING * 2;

    const generatedWords = generateWordData();
    const validWords = validateWords(generatedWords, containerWidth, containerHeight);

    setWords(validWords);
    setDimensions({
      width: containerWidth,
      height: containerHeight,
    });
  }
}, [start, parentRef]);
  return (
    <div className="items-center justify-center overflow-hidden w-full h-full" data-cy="wordcloud-canvas">
      <div
        className={`transition-opacity duration-1000 ${
          start ? "opacity-100" : "opacity-0"
        }`}
      >
        {start && (
          <WordCloud
            width={dimensions.width}
            height={dimensions.height}
            data={words}
            fontSize={(word) => (word as MyWord).fontSize}
            rotate={(word) => (word as MyWord).rotation}
            fill={(word: MyWord) => (word as MyWord).color}
            padding={WORDCLOUD_PADDING}
            font="Times"
            fontStyle="italic"
            fontWeight="bold"
            spiral="rectangular"
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
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef} className="flex min-h-screen w-full items-center justify-center snap-start">
      <WordCloudComponent start={startAnimation} parentRef={sectionRef} />
    </section>
  );
}
