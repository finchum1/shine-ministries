import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // merch.shineministriesok.com is the same site with its front door pointed
  // at the order page, so the link you send people is just that address.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "merch.shineministriesok.com" }],
          destination: "/merch",
        },
      ],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jejbcxeauqzmfpamvawy.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "www.shineministriesok.com",
        pathname: "/brand/**",
      },
    ],
  },
};

export default nextConfig;
