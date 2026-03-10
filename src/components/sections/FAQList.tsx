"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  HiOutlineUser,
  HiOutlineArrowsRightLeft,
  HiOutlineTruck,
  HiOutlineHome,
  HiOutlineCurrencyDollar,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi2";
import SectionTitle from "@/components/ui/SectionTitle";

const FAQ_CATEGORIES = [
  { id: "personal", label: "個人信貸", icon: HiOutlineUser },
  { id: "debt", label: "債務整合", icon: HiOutlineArrowsRightLeft },
  { id: "car", label: "汽車貸款", icon: HiOutlineTruck },
  { id: "housing", label: "房屋貸款", icon: HiOutlineHome },
  { id: "small", label: "小額貸款", icon: HiOutlineCurrencyDollar },
];

const FAQ_DATA: Record<string, { question: string; answer: string }[]> = {
  personal: [
    {
      question: "債務整合有什麼好處？",
      answer: `1. 降低利率：利用信貸比較網挑選適合自己條件的銀行信貸方案，取得最合理的整合信貸利率，能有效降低利息成本。

2. 延長還款年限：信貸還款期限最長為7年，原本現有貸款的還款期限是3年，債務整合後延長至7年，總額不變的情況下，貸款期數變多，每月分攤到的還款金額就會降低，如此一來就能有效降低每月還款壓力。

3. 繳款時間統一：不同銀行的信用卡、信貸繳款截止日期都不同，光是要記得哪一張信用卡已繳費，哪個貸款未繳費就已經佔掉不知道多少腦容量，負債整合後，所有債務都會集中在一家銀行，之後只要繳給那一家銀行就好，大大清出腦內硬碟容量。

4. 降低月付金：債務整合後，貸款利率降低、貸款的期限也變長，平均分攤到每期的月付金也會理所當然地跟著下降，再也不用每個月都被帳單追著跑，也可以順利度過難關、提升生活品質。

5. 提升信用評分：很多人會擔心申請債務整合會不會扣信用評分，事實上當各種貸款整合在同一家銀行，負債型態變得單一，而且整合後能每月按時還款，信用評分反而會穩定上升，對個人信用而言是一件好事。`,
    },
    {
      question: "債務整合的條件？",
      answer:
        "通常需具備穩定收入、信用評分達一定標準，且負債總額在可整合範圍內。各家銀行條件不同，建議諮詢專業顧問評估。",
    },
    {
      question: "債務整合的陷阱",
      answer:
        "常見陷阱包括：隱藏手續費、過長的綁約期、未實際降低利率等。選擇時務必審閱合約條款，並多方比較。",
    },
    {
      question: "怎麼選擇債務整合銀行？",
      answer:
        "可比較利率、手續費、還款彈性及銀行服務。建議透過專業顧問協助評估，找出最適合的方案。",
    },
  ],
  debt: [
    {
      question: "什麼是債務整合？",
      answer:
        "債務整合是將多筆貸款、信用卡債整合成一筆貸款，透過較低利率與較長還款期，降低每月還款壓力。",
    },
    {
      question: "債務整合需要多久？",
      answer:
        "通常從申請到撥款約 1～2 週，實際時程依銀行審核與個人資料完整度而定。",
    },
  ],
  car: [
    {
      question: "汽車貸款利率怎麼算？",
      answer:
        "汽車貸款利率依車款、信用狀況、貸款期限而定，通常為年利率 3%～8%。新車與中古車利率不同。",
    },
    {
      question: "可以貸多少成？",
      answer: "新車通常可貸至車價 8～9 成，中古車依車齡與車況，約 5～7 成。",
    },
  ],
  housing: [
    {
      question: "房貸寬限期是什麼？",
      answer:
        "寬限期內僅需繳利息、不需還本金，適合資金調度或短期資金壓力較大的情況。",
    },
    {
      question: "轉貸划算嗎？",
      answer:
        "若新銀行利率較低，且省下的利息大於轉貸成本（手續費、代償費等），則轉貸較划算。",
    },
  ],
  small: [
    {
      question: "小額貸款額度多少？",
      answer: "通常 1～30 萬不等，依各家銀行規定與個人信用評分而定。",
    },
    {
      question: "申請需要什麼文件？",
      answer:
        "身分證、收入證明（薪資單、扣繳憑單等）、存摺封面。部分銀行可線上申辦。",
    },
  ],
};

export default function FAQList() {
  const [activeCategory, setActiveCategory] = useState("personal");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqs = FAQ_DATA[activeCategory] ?? [];

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setExpandedIndex(0);
  };

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title="常見問題" />
        <div className="flex justify-center items-center flex-wrap gap-4 mb-8">
          {FAQ_CATEGORIES.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleCategoryChange(item.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-colors min-w-[100px]",
                  isActive
                    ? "border-primary shadow-lg shadow-black/5"
                    : "border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-300",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "bg-neutral-200 text-neutral-400",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    isActive ? "text-deep" : "",
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white shadow-lg shadow-black/5 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                >
                  <h3
                    className={cn(
                      "font-bold text-lg",
                      isExpanded ? "text-primary" : "text-deep",
                    )}
                  >
                    {faq.question}
                  </h3>
                  {isExpanded ? (
                    <HiOutlineChevronUp className="w-5 h-5 shrink-0 text-primary" />
                  ) : (
                    <HiOutlineChevronDown className="w-5 h-5 shrink-0 text-neutral-400" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-neutral-100">
                      <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
