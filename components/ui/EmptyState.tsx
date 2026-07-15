type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="card-white rounded-[28px] p-8 text-center sm:p-10">
      <h3 className="theme-text font-display text-2xl font-black tracking-[-0.03em]">{title}</h3>
      <p className="theme-text-muted mx-auto mt-3 max-w-xl text-base leading-7">{description}</p>
    </div>
  );
}
