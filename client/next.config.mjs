/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com", 
      "solvit-client.vercel.app", 
      "solvit-test-deploy.vercel.app",
      "randomuser.me"  // Add this line
    ],
  },
  experimental: {
    reactRoot: true,
    suppressHydrationWarning: true,
  },
};

export default nextConfig;
