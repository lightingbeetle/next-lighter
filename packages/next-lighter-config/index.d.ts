import { NextConfig } from "next";
/** Build Next.js config with Lighter defaults */
export declare function createConfig({
  nextConfig,
  plugins,
}: {
  /** Next.js custom config */
  nextConfig?: NextConfig;
  /** Next.js plugins */
  plugins?: ((any) => any)[];
  /** analyze bundle with @next/bundle-analyzer */
  analyzeBundle?: boolean;
}): NextConfig;
