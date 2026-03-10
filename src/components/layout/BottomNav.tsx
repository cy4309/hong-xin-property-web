"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineChatBubbleLeftRight,
  HiOutlineQuestionMarkCircle,
  HiOutlineUser,
} from "react-icons/hi2";
import { HiOutlineBriefcase } from "react-icons/hi";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "首頁", icon: HiOutlineHome },
  { href: "/services", label: "服務項目", icon: HiOutlineBriefcase },
  { href: "/#contact", label: "", icon: HiOutlineChatBubbleLeftRight, isCta: true },
  { href: "/faq", label: "常見問題", icon: HiOutlineQuestionMarkCircle },
  { href: "/about", label: "關於我們", icon: HiOutlineUser },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 lg:hidden">
      <div className="flex items-center justify-around h-16 max-w-6xl mx-auto px-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon, isCta }) => {
          const isActive =
            !isCta &&
            (href === "/"
              ? pathname === "/"
              : href.startsWith("/#")
                ? pathname === "/"
                : pathname.startsWith(href));
          if (isCta) {
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center justify-center -mt-6"
              >
                <div className="w-14 h-14 rounded-full bg-[#C8A25A] flex items-center justify-center shadow-lg shadow-black/10">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[4rem]"
            >
              <Icon
                className={cn(
                  "w-6 h-6",
                  isActive ? "text-[#C8A25A]" : "text-neutral-400",
                )}
              />
              <span
                className={cn(
                  "text-xs",
                  isActive ? "text-[#C8A25A] font-medium" : "text-neutral-400",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
