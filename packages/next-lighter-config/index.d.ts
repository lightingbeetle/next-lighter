import { NextConfig } from "next";

export declare function createConfig({
  nextConfig,
  plugins,
}: {
  nextConfig?: NextConfig;
  plugins?: ((any) => any)[];
  analyzeBundle?: boolean;
}): NextConfig;
