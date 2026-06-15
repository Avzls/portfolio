/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Produces a minimal standalone server bundle for Docker/production.
  output: "standalone",
}


module.exports = nextConfig
