import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>
        <Navbar />
        {children}
        <Footer />
        <div className="h-16 lg:hidden" aria-hidden />
        <BottomNav />
      </body>
    </html>
  );
}
