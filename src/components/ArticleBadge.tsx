"use client";

import { Newspaper, Briefcase } from "lucide-react";

interface ArticleBadgeProps {
  type: "blog-post" | "case-study";
}

export default function ArticleBadge({ type }: ArticleBadgeProps) {
  const config = {
    "blog-post": {
      label: "Blog Post",
      Icon: Newspaper,
      className: "bg-primary/10 text-primary border-primary/20",
    },
    "case-study": {
      label: "Case Study",
      Icon: Briefcase,
      className: "bg-secondary/10 text-secondary border-secondary/20",
    },
  };

  const { label, Icon, className } = config[type];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${className}`}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
      {label}
    </span>
  );
}
