import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import {
  HiOutlineHome,
  HiOutlineCurrencyDollar,
  HiOutlineArrowTrendingUp,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

const SERVICES_DATA = [
  {
    id: "mortgage",
    title: "房貸規劃",
    description: "整合多元管道，提供最適合您的房貸優化方案。",
    icon: HiOutlineHome,
  },
  {
    id: "credit",
    title: "信貸方案",
    description: "快速便捷的資金周轉，個人化利率評估與規劃。",
    icon: HiOutlineCurrencyDollar,
  },
  {
    id: "investment",
    title: "投資顧問",
    description: "精準分析市場趨勢，量身打造資產增值策略。",
    icon: HiOutlineArrowTrendingUp,
  },
  {
    id: "risk",
    title: "風險管理",
    description: "全方位評估潛在財務風險，守護您的資本安全。",
    icon: HiOutlineShieldCheck,
  },
];

export default function ServiceGrid() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <SectionTitle title="服務項目" />
          <Link href="/services" className="text-primary text-sm underline">
            查看更多
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES_DATA.map((item) => (
            <Card key={item.id}>
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-deep text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
