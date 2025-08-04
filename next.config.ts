import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/byte-site',
  assetPrefix: '/byte-site/',
  images: {
    unoptimized: true,
  },
};


export default nextConfig;


