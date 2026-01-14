/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  env: {
    WEB3FORMS_API_KEY: process.env.WEB3FORMS_API_KEY,
  },
};

export default nextConfig;
