export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover: string;
  date: string;
  seoTitle: string;
  seoDesc: string;
};

const SHEET_API = process.env.NEXT_PUBLIC_SHEET_API;

/** Sheet 無資料時的開發用假資料 */
const FALLBACK_ITEM: NewsItem = {
  id: "1",
  title: "2025年房貸利率趨勢與資金規劃建議",
  slug: "2025-mortgage-trends",
  excerpt:
    "隨著央行貨幣政策調整，房貸利率將如何影響您的購屋與轉貸決策？本文整理最新趨勢與實務建議。",
  content: `隨著央行貨幣政策調整，房貸利率將如何影響您的購屋與轉貸決策？

【重點整理】
• 目前房貸利率區間與各家銀行差異
• 轉貸時機判斷與試算要點
• 資金整合與負債優化策略

若有房貸或資金規劃需求，歡迎聯繫泓鑫資產管理顧問，由專業顧問為您量身規劃。`,
  cover: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
  date: "2025-03-01",
  seoTitle: "2025年房貸利率趨勢 | 泓鑫資產管理顧問",
  seoDesc:
    "2025年房貸利率趨勢分析與資金規劃建議，台北房貸轉貸、資金整合專業諮詢。",
};

export async function getNews(): Promise<NewsItem[]> {
  if (!SHEET_API) return [FALLBACK_ITEM];
  try {
    const res = await fetch(`${SHEET_API}?action=list`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return [FALLBACK_ITEM];
    const data = await res.json();
    const items = Array.isArray(data) ? data : (data?.data ?? []);
    return items.length > 0 ? [...items].reverse() : [FALLBACK_ITEM];
  } catch {
    return [FALLBACK_ITEM];
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  if (!SHEET_API) return FALLBACK_ITEM.slug === slug ? FALLBACK_ITEM : null;
  try {
    const res = await fetch(
      `${SHEET_API}?action=detail&slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: 120 } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (
      data &&
      typeof data === "object" &&
      !Array.isArray(data) &&
      "id" in data
    ) {
      return data as NewsItem;
    }
    return FALLBACK_ITEM.slug === slug ? FALLBACK_ITEM : null;
  } catch {
    return FALLBACK_ITEM.slug === slug ? FALLBACK_ITEM : null;
  }
}
