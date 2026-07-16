import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://byte-eng.dev';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/blog/5-annoying-tasks`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/articles/case-study-travel-company`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];
}
