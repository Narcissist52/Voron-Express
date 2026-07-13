"use client";

type QuantitySelectorProps = {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function QuantitySelector({
  value,
  onDecrease,
  onIncrease
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-black/10 bg-white">
      <button className="h-10 w-10 text-lg font-bold text-neutral-700" onClick={onDecrease} type="button">
        -
      </button>
      <span className="min-w-8 text-center text-sm font-bold text-neutral-900">{value}</span>
      <button className="h-10 w-10 text-lg font-bold text-neutral-700" onClick={onIncrease} type="button">
        +
      </button>
    </div>
  );
}
