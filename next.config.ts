import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/launches',
        permanent: true, // 308 redirect (good for SEO if permanent)
      },
    ]

  }
};

export default nextConfig;
