import { Shield, Truck, RotateCcw, Star } from "lucide-react";

const features = [
  { icon: Star, title: "Best Quality", desc: "100% Guarantee" },
  { icon: Shield, title: "100% Pure", desc: "No Milawat" },
  { icon: Truck, title: "Huge Savings", desc: "At Lowest Price" },
  { icon: RotateCcw, title: "Easy Returns", desc: "No Questions Asked" },
];

export default function Features() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <f.icon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">{f.title}</h4>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}