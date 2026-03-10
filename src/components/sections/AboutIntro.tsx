import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export default function AboutIntro() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title="關於我們" subtitle="認識test" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-video rounded-2xl bg-neutral-200" />
          <div>
            <p className="text-neutral-600 mb-6">
              公司簡介文字內容，介紹test的成立背景、經營理念與核心價值。
            </p>
            <p className="text-neutral-600 mb-8">
              更多關於團隊、服務範圍與專業能力的說明。
            </p>
            <Button>了解更多</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
