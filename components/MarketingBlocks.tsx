import Link from "next/link";
import type { ReactNode } from "react";
import { WorkshopPhoto, type WorkshopPhotoKey } from "./WorkshopPhoto";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  dark?: boolean;
  center?: boolean;
  image?: WorkshopPhotoKey;
  children?: ReactNode;
};

export function PageHero({
  eyebrow, title, description, dark = false, center = false,
  image = "workshop", children,
}: PageHeroProps) {
  if (center) {
    return (
      <section className={"marketing-hero page-hero-centered " + (dark ? "marketing-hero-dark" : "")}>
        <div className="page-shell py-14 text-center sm:py-20">
          <p className={"eyebrow justify-center " + (dark ? "eyebrow-on-dark" : "")}>{eyebrow}</p>
          <h1 className={"marketing-text-balance mx-auto mt-5 max-w-4xl text-[clamp(38px,5vw,68px)] font-extrabold leading-[1.08] tracking-[-.06em] " + (dark ? "text-white" : "text-[#151719]")}>{title}</h1>
          <p className={"mx-auto mt-6 max-w-2xl text-[16px] leading-8 sm:text-[17px] " + (dark ? "text-white/75" : "text-slate-600")}>{description}</p>
          {children ? <div className="mt-8">{children}</div> : null}
          <WorkshopPhoto photo={image} className="mt-10 h-[245px] sm:h-[350px] lg:h-[420px]" sizes="(max-width: 1200px) 100vw, 1200px" caption="A closer look at the workshop floor" />
        </div>
      </section>
    );
  }

  return (
    <section className={"marketing-hero overflow-hidden " + (dark ? "marketing-hero-dark text-white" : "")}>
      <div className="page-shell grid items-center gap-9 py-14 sm:py-20 lg:grid-cols-[.94fr_1.06fr] lg:gap-14">
        <div className="relative z-10 reveal">
          <p className={"eyebrow " + (dark ? "eyebrow-on-dark" : "")}>{eyebrow}</p>
          <h1 className={"marketing-text-balance mt-5 max-w-3xl text-[clamp(38px,4.7vw,66px)] font-extrabold leading-[1.08] tracking-[-.06em] " + (dark ? "text-white" : "text-[#151719]")}>{title}</h1>
          <p className={"mt-6 max-w-xl text-[16px] leading-8 sm:text-[17px] " + (dark ? "text-white/75" : "text-slate-600")}>{description}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        <WorkshopPhoto photo={image} className="h-[330px] sm:h-[440px] lg:h-[500px]" priority caption="Built for real workshop routines">
          <div className="photo-label"><span className="photo-label-dot" /> WORKSHOP OPERATIONS</div>
        </WorkshopPhoto>
      </div>
    </section>
  );
}

type SectionLeadProps = {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
};

export function SectionLead({ eyebrow, title, description, center = false }: SectionLeadProps) {
  return (
    <div className={"reveal " + (center ? "mx-auto max-w-2xl text-center" : "max-w-2xl")}>
      <p className={"eyebrow " + (center ? "justify-center" : "")}>{eyebrow}</p>
      <h2 className="section-title marketing-text-balance mt-4">{title}</h2>
      {description ? <p className="section-copy mt-4">{description}</p> : null}
    </div>
  );
}

type BottomCTAProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  label: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function BottomCTA({ eyebrow, title, description, href, label, secondaryHref, secondaryLabel }: BottomCTAProps) {
  return (
    <section className="bg-white py-12 sm:py-18">
      <div className="page-shell">
        <div className="marketing-cta grid items-center gap-7 lg:grid-cols-[1fr_auto]">
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow eyebrow-on-dark">{eyebrow}</p>
            <h2 className="marketing-text-balance mt-4 text-[clamp(30px,3.4vw,46px)] font-extrabold leading-[1.13] tracking-[-.05em] text-white">{title}</h2>
            <p className="mt-4 text-[15px] leading-7 text-white/70">{description}</p>
          </div>
          <div className="responsive-actions relative z-10">
            <Link href={href} className="button-primary focus-ring inline-flex">{label}</Link>
            {secondaryHref && secondaryLabel ? <Link href={secondaryHref} className="button-dark-outline focus-ring">{secondaryLabel}</Link> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
