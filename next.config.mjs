/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["@mdx-js/mdx", "next-mdx-remote"],
  },
};

export default nextConfig;
