"use client";

import Link from "next/link";
import ArticleBadge from "./ArticleBadge";

interface Article {
  slug: string;
  title: string;
  type: "blog-post" | "case-study";
  date: string;
  excerpt?: string;
}

const articles: Article[] = [
  {
    slug: "/articles/case-study-travel-company",
    title: "How we cut a travel operator's manual workload with AI automation",
    type: "case-study",
    date: "2026-01-25",
    excerpt:
      "A Romanian travel company was drowning in repetitive back-office work. We built an AI automation that handled it end-to-end.",
  },
  {
    slug: "/blog/5-annoying-tasks",
    title: "The 5 Most Annoying Tasks in Every Business",
    type: "blog-post",
    date: "2026-01-13",
    excerpt:
      "Every business has friction. These five annoyances reveal something fundamental about the future of work.",
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticlesList() {
  return (
    <section id="articles" className="min-h-screen flex items-center justify-center snap-start bg-background text-foreground py-16">
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Articles & Case Studies
        </h2>
        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={article.slug}
              className="block p-6 rounded-lg border border-foreground/10 hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <ArticleBadge type={article.type} />
                    <time className="text-sm text-foreground/60">
                      {formatDate(article.date)}
                    </time>
                  </div>
                  <h3 className="text-xl font-semibold leading-tight">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-foreground/70 text-sm">{article.excerpt}</p>
                  )}
                </div>
                <span className="text-primary font-medium text-sm whitespace-nowrap">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
