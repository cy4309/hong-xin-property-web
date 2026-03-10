"use client";

import { useState, useEffect, useRef } from "react";

const STATS_DATA = [
  { value: 3000, suffix: "+", label: "用戶成功收到貸款方案" },
  { value: 99, suffix: "%", label: "顧客好評" },
  { value: 100, suffix: "+", label: "亞太區合作公司" },
  { value: 10, suffix: "+", label: "專業年資" },
];

function formatNumber(n: number) {
  return n.toLocaleString("zh-TW");
}

function useCountUp(target: number, duration: number, isVisible: boolean) {
  const [display, setDisplay] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = 0;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.floor(start + (target - start) * eased);
      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(target);
        setShowSuffix(true);
      }
    }

    requestAnimationFrame(tick);
  }, [target, duration, isVisible]);

  return { display, showSuffix };
}

function StatCard({
  target,
  suffix,
  label,
  isVisible,
}: {
  target: number;
  suffix: string;
  label: string;
  isVisible: boolean;
}) {
  const { display, showSuffix } = useCountUp(target, 1500, isVisible);

  return (
    <div className="rounded-2xl bg-neutral-50 p-6 text-center shadow-lg shadow-black/5">
      <div className="text-3xl font-bold text-primary mb-1">
        {formatNumber(display)}
        {showSuffix && suffix}
      </div>
      <div className="text-sm text-neutral-500">{label}</div>
    </div>
  );
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS_DATA.map((item) => (
            <StatCard
              key={item.label}
              target={item.value}
              suffix={item.suffix}
              label={item.label}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
