import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Any other page of the main site opened on the merch address (an old
  // link, a typed URL) is sent to the real site instead of being served
  // from the merch address.
  async redirects() {
    return ["about", "events", "bible-studies", "get-involved"].map((page) => ({
      source: `/${page}`,
      has: [{ type: "host" as const, value: "merch.shineministriesok.com" }],
      destination: `https://www.shineministriesok.com/${page}`,
      permanent: false,
    }));
  },
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
