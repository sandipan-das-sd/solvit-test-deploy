// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["res.cloudinary.com", "solvit-client.vercel.app", "solvit-test-deploy.vercel.app"],
//   },
//   experimental: {
//     reactRoot: true,
//     suppressHydrationWarning: true,
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Adjusted to match the Facebook domains
      },
      {
        protocol: "https",
        hostname: "**", // Allow images from any domain (use with caution)
      },
    ],
    domains: [
      "res.cloudinary.com",
      "solvit-client.vercel.app",
      "solvit-test-deploy.vercel.app",
    ],
  },
  experimental: {
    reactRoot: true,
    suppressHydrationWarning: true,
  },
  env: {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET,
  },
};

export default nextConfig;
