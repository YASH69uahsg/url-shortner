import { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const articleEntries: MetadataRoute.Sitemap = ARTICLES.map((art) => ({
    url: `${baseUrl}/articles/${art.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...articleEntries,
  ];
}
