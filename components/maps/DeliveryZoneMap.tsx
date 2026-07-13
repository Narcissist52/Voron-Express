import { deliveryZones } from "@/data/mock-data";

type DeliveryZoneMapProps = {
  highlightedZoneId?: string;
};

export function DeliveryZoneMap({ highlightedZoneId }: DeliveryZoneMapProps) {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-white p-6 shadow-[0_16px_36px_rgba(0,0,0,0.06)] sm:p-8">
      <div className="relative min-h-[340px] overflow-hidden rounded-[28px] bg-[#F6F6F4] p-6">
        <div className="accent-grid absolute inset-0 opacity-35" />
        <div className="absolute left-[16%] top-[18%] h-20 w-20 rounded-full border border-black/8 bg-white/60" />
        <div className="absolute right-[12%] top-[24%] h-24 w-24 rounded-full border border-black/8 bg-white/60" />
        <div className="absolute bottom-[16%] left-[24%] h-20 w-20 rounded-full border border-black/8 bg-white/60" />
        <div className="absolute bottom-[12%] right-[20%] h-28 w-28 rounded-full border border-black/8 bg-white/60" />

        {deliveryZones.map((zone, index) => (
          <div
            key={zone.id}
            className={`absolute rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
              highlightedZoneId === zone.id
                ? "scale-105 border-[#151515] bg-[#151515] text-white"
                : "border-black/10 bg-white text-[#6D6D6D]"
            }`}
            style={{
              top: `${18 + index * 18}%`,
              left: `${12 + (index % 2) * 46}%`
            }}
          >
            {zone.title}
          </div>
        ))}

        <div className="absolute left-[22%] top-[28%] h-[2px] w-[48%] rotate-[18deg] bg-gradient-to-r from-transparent via-[#FFC400] to-transparent" />
        <div className="absolute left-[12%] top-[58%] h-[2px] w-[56%] -rotate-[12deg] bg-gradient-to-r from-transparent via-[#151515] to-transparent opacity-45" />

        <div className="absolute bottom-5 left-5 rounded-[20px] border border-black/8 bg-white px-4 py-3 text-sm text-[#6D6D6D] shadow-[0_12px_30px_rgba(0,0,0,0.05)]">
          Статичний placeholder мапи. Пізніше компонент можна замінити на інтеграцію з картами без перебудови сторінки.
        </div>
      </div>
    </div>
  );
}
