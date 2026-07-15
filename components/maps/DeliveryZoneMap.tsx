import { deliveryZones } from "@/data/mock-data";

type DeliveryZoneMapProps = {
  highlightedZoneId?: string;
};

export function DeliveryZoneMap({ highlightedZoneId }: DeliveryZoneMapProps) {
  return (
    <div className="card-white relative overflow-hidden rounded-[32px] p-6 sm:p-8">
      <div className="theme-surface-muted relative min-h-[340px] overflow-hidden rounded-[28px] p-6">
        <div className="accent-grid absolute inset-0 opacity-35" />
        <div className="theme-map-panel absolute left-[16%] top-[18%] h-20 w-20 rounded-full bg-white/60" />
        <div className="theme-map-panel absolute right-[12%] top-[24%] h-24 w-24 rounded-full bg-white/60" />
        <div className="theme-map-panel absolute bottom-[16%] left-[24%] h-20 w-20 rounded-full bg-white/60" />
        <div className="theme-map-panel absolute bottom-[12%] right-[20%] h-28 w-28 rounded-full bg-white/60" />

        {deliveryZones.map((zone, index) => (
          <div
            key={zone.id}
            className={`absolute rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
              highlightedZoneId === zone.id
                ? "scale-105 border-[#151515] bg-[#151515] text-white"
                : "theme-outline-button theme-text-muted"
            }`}
            style={{
              top: `${18 + index * 18}%`,
              left: `${12 + (index % 2) * 46}%`
            }}
          >
            {zone.title}
          </div>
        ))}

        <div className="theme-accent-line absolute left-[22%] top-[28%] h-[2px] w-[48%] rotate-[18deg]" />
        <div className="absolute left-[12%] top-[58%] h-[2px] w-[56%] -rotate-[12deg] bg-gradient-to-r from-transparent via-[#151515] to-transparent opacity-45" />

        <div className="theme-map-panel theme-text-muted absolute bottom-5 left-5 rounded-[20px] px-4 py-3 text-sm">
          Статичний placeholder мапи. Пізніше компонент можна замінити на інтеграцію з картами без перебудови сторінки.
        </div>
      </div>
    </div>
  );
}
