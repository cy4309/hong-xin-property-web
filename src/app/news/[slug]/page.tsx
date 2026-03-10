import { notFound } from "next/navigation";
import Link from "next/link";
import { getNewsBySlug } from "@/lib/sheet";
import { generatePageMetadata } from "@/lib/seo";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  return generatePageMetadata({
    title: item?.seoTitle ?? "新聞詳情",
    description: item?.seoDesc ?? `新聞文章：${slug}`,
    path: `/news/${slug}`,
  });
}

export default async function NewsSlugPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) notFound();

  return (
    <article className="bg-neutral-50 min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/news"
          className="text-primary hover:opacity-90 mb-6 flex items-center gap-2"
        >
          <FaArrowLeft /> 返回最新消息
        </Link>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-deep mb-4">{item.title}</h1>
          <time className="text-neutral-500 text-sm">{item.date}</time>
        </header>
        {item.cover && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img
              src={item.cover}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="text-neutral-600 leading-relaxed whitespace-pre-wrap">
          {item.content}
        </div>
      </div>
    </article>
  );
}
