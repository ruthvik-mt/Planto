const withPWA = require("next-pwa")({
  dest: "public", // output folder for service worker and manifest
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // disables PWA in dev
})

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  images: {
    domains: ["plant-id.ams3.cdn.digitaloceanspaces.com"],
  },
}

// 🧠 Compose both MDX and PWA plugins
module.exports = withPWA(withMDX(nextConfig))
