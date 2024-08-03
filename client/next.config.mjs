const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "randomuser.me", "example.com"],
  },
  experimental: {
    reactRoot: true,
    suppressHydrationWarning: true,
  },
};

export default nextConfig;
