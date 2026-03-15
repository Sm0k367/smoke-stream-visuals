/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Required for @react-three/fiber + three.js in Next.js
  transpilePackages: ['three'],

  // Optional: helps with large canvases / 3D perf on some hosts
  images: {
    domains: ['localhost', 'smoke-stream-visuals.vercel.app'],
    minimumCacheTTL: 60,
  },

  // If you later want to experiment with Turbopack (faster dev)
  // experimental: {
  //   turbopack: true,
  // },
};

module.exports = nextConfig;
