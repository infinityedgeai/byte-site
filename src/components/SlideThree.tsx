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
  { text: "Ser", value: 10 },
  { text: "vices", value: 80 },
  { text: "Cloudy", value: 35 },
  { text: "Development", value: 45 },
  { text: "Byte Engineering", value: 55 },
  { text: "AI Solutions", value: 28 },
  { text: "Software Dev", value: 22 },
  { text: "Cloud Services", value: 18 },
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
    rotation: Math.random() > 0.5 ? 0 : 90,
    color: ["#2563eb", "#9333ea", "#f59e0b", "#10b981"][
      Math.floor(Math.random() * 4)
    ],
    fontSize: word.value * 2,
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
    <div className="items-center justify-center overflow-hidden w-full h-full">
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
