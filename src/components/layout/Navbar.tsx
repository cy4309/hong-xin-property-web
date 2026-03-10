"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "首頁" },
  { href: "/services", label: "服務項目" },
  { href: "/news", label: "最新消息" },
  { href: "/faq", label: "貸款大哉問" },
  { href: "/about", label: "關於test" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 bg-white/80 backdrop-blur",
        scrolled ? "shadow-md" : "",
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <div className="font-bold text-[#0F1B2D]">test</div>
          <div className="text-xs text-neutral-500">test Asset Management</div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-neutral-600 hover:text-[#C8A25A] transition-colors",
                  isActive ? "font-semibold text-[#C8A25A]" : undefined,
                )}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            className="ml-4 bg-[#C8A25A] text-white rounded-xl px-4 py-2 hover:opacity-90 transition-opacity font-medium"
          >
            立即諮詢
          </Link>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-neutral-600 hover:text-[#C8A25A]"
            aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
          >
            {mobileOpen ? (
              <HiOutlineXMark className="w-6 h-6" />
            ) : (
              <HiOutlineBars3 className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-neutral-100 md:hidden">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "py-3 px-4 rounded-lg text-neutral-600 hover:text-[#C8A25A] hover:bg-neutral-50",
                    isActive ? "font-semibold text-[#C8A25A] bg-[#C8A25A]/5" : undefined,
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 py-3 px-4 bg-[#C8A25A] text-white rounded-xl text-center font-medium hover:opacity-90"
            >
              立即諮詢
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
