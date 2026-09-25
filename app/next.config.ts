import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/sanity/imageLoader.ts',
  },
  reactStrictMode: true,
}

export default nextConfig
