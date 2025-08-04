/** @type {import('next').NextConfig} */
const isGithubPreview = process.env.NEXT_PUBLIC_IS_GITHUB_PREVIEW === 'true';

const nextConfig = {
  output: 'export',
  basePath: isGithubPreview ? '/byte-site' : '',
  assetPrefix: isGithubPreview ? '/byte-site/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
