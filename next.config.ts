import type { NextConfig } from "next";

// Fully static site (out/): fast, never sleeps, good for SEO and AdSense review.
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};
export default config;
