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
    <div className="theme-outline-button inline-flex items-center rounded-full border">
      <button className="theme-text-muted h-10 w-10 text-lg font-bold" onClick={onDecrease} type="button">
        -
      </button>
      <span className="theme-text min-w-8 text-center text-sm font-bold">{value}</span>
      <button className="theme-text-muted h-10 w-10 text-lg font-bold" onClick={onIncrease} type="button">
        +
      </button>
    </div>
  );
}
