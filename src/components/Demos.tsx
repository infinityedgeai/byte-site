"use client";

import React from "react";
import Link from "next/link";


export default function Demos() {
  return (
    <section className="h-screen flex flex-col items-center justify-center snap-start bg-background text-foreground px-6">
      <h1 className="text-6xl font-bold mb-8">
        <span className="text-primary">Byte</span><span className="text-secondary">AI</span>
      </h1>
      <div className="max-w-2xl text-center space-y-6">
        <p className="text-xl">
          Building software that clears the path for people to do meaningful work.
        </p>
        <Link
          href="/blog/5-annoying-tasks"
          className="inline-block px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-primary/80 transition-colors"
        >
          Read: The 5 Most Annoying Tasks in Every Business
        </Link>
      </div>
    </section>
  );
}