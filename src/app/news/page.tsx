import Link from "next/link";
import { getNews } from "@/lib/sheet";
import { generatePageMetadata } from "@/lib/seo";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

export const metadata = generatePageMetadata({
  title: "最新消息",
  description: "泓鑫資產管理顧問最新動態與產業資訊",
  path: "/news",
});

export default async function NewsPage() {
  const items = await getNews();

  return (
    <div className="bg-neutral-50 min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title="最新消息" subtitle="掌握最新動態" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link key={item.id} href={`/news/${item.slug}`}>
              <Card>
                <div className="aspect-video bg-neutral-100">
                  {item.cover && (
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-deep mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 line-clamp-2 mb-4">
                    {item.excerpt}
                  </p>
                  <span className="text-xs text-neutral-400">{item.date}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        {items.length === 0 && (
          <p className="text-center text-neutral-500 py-12">尚無消息</p>
        )}
      </div>
    </div>
  );
}
