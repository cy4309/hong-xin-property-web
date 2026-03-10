import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

export default function ContactCard() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title="聯絡我們" subtitle="歡迎與我們聯繫" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "地址", value: "聯絡地址" },
            { label: "電話", value: "聯絡電話" },
            { label: "Email", value: "聯絡信箱" },
          ].map((item) => (
            <Card key={item.label}>
              <div className="p-6 text-center">
                <div className="text-sm text-neutral-500 mb-2">{item.label}</div>
                <div className="font-medium text-deep">{item.value}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
