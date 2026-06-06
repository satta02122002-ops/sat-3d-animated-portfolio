import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = "https://satteches.com";
  const sections = [
    "",
    "#about",
    "#experience",
    "#skills",
    "#command-center",
    "#analytics",
    "#projects",
    "#achievements",
    "#contact",
  ];
  return sections.map((s) => ({
    url: `${url}/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: s === "" ? 1 : 0.7,
  }));
}
