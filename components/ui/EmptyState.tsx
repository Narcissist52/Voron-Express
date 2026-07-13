type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="card-white rounded-[28px] p-8 text-center sm:p-10">
      <h3 className="font-display text-2xl font-black tracking-[-0.03em] text-[#171717]">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-[#6D6D6D]">{description}</p>
    </div>
  );
}
