import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'framer-motion', 'gsap'],
  },
};

export default nextConfig;
