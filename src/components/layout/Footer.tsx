import Link from "next/link";

const NAV_LINKS = [
  { href: "/services", label: "服務項目" },
  { href: "/news", label: "最新消息" },
  { href: "/faq", label: "貸款大哉問" },
  { href: "/about", label: "關於test" },
];

export default function Footer() {
  return (
    <footer>
      <div className="bg-neutral-100 text-neutral-600 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm">
              <p>© test</p>
            </div>
            <nav className="hidden lg:flex flex-wrap gap-6">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm hover:text-[#C8A25A] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
