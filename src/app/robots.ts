import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://satteches.com/sitemap.xml",
    host: "https://satteches.com",
  };
}
