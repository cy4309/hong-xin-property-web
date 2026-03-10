import type { Metadata } from "next";

const siteName = "泓鑫資產管理顧問";
export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const ogImagePath = "/og.jpg";

type GeneratePageMetadataParams = {
  title: string;
  description: string;
  path?: string;
};

export function generatePageMetadata({
  title,
  description,
  path = "",
}: GeneratePageMetadataParams): Metadata {
  const url = path ? `${baseUrl}${path}` : baseUrl;
  const ogImage = `${baseUrl}${ogImagePath}`;

  return {
    title: `${title} | ${siteName}`,
    description,
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "zh_TW",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
    },
  };
}
