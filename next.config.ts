import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY;
const customSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
const repoName = repository?.split("/")[1];
const derivedBasePath =
  process.env.GITHUB_ACTIONS === "true" && !customSiteUrl && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? derivedBasePath,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ?? derivedBasePath,
};

export default nextConfig;
