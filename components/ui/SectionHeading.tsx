type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light"
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2
        className={`font-display mt-5 text-3xl font-black tracking-[-0.04em] sm:text-4xl ${
          isDark ? "text-white" : "theme-text"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`font-ui mt-4 text-base leading-7 ${isDark ? "text-neutral-300" : "theme-text-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
