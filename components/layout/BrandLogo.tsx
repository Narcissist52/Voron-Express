import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function BrandLogo({
  href,
  className = "",
  imageClassName = "",
  priority = false
}: BrandLogoProps) {
  const content = (
    <div className={`flex h-11 shrink-0 items-center justify-start overflow-visible ${className}`}>
      <Image
        src="/images/editorial/logo_voron_express-removebg-preview.png"
        alt="VORON EXPRESS"
        width={240}
        height={120}
        priority={priority}
        className={`h-full w-auto object-contain object-left mix-blend-multiply ${imageClassName}`}
      />
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} scroll aria-label="VORON EXPRESS" className="shrink-0">
      {content}
    </Link>
  );
}
