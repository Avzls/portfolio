/** @type {import('next').NextConfig} */

// Base path for GitHub Pages project sites (https://user.github.io/<repo>).
// The deploy workflow sets NEXT_PUBLIC_BASE_PATH automatically; left empty for
// local builds and *.github.io user sites.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: false,
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

module.exports = nextConfig;
