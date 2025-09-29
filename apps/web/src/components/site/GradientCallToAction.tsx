import Link from "next/link";
import { Fragment } from "react";

interface SecondaryCta {
  label: string;
  href: string;
  external?: boolean;
}

interface GradientCallToActionProps {
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCtas?: SecondaryCta[];
}

export function GradientCallToAction({
  title,
  description,
  primaryCta,
  secondaryCtas,
}: GradientCallToActionProps) {
  return (
    <section
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full"
      style={{ background: "var(--gradient-primary)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20 opacity-30" />
      <div className="w-full max-w-4xl mx-auto text-center relative z-10">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight">
          {title}
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 px-4 sm:px-0">
          <Link
            href={primaryCta.href}
            className="group bg-white text-[var(--accent)] hover:bg-white/90 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            {primaryCta.label}
            <svg
              className="ml-2 w-5 h-5 inline-block group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {secondaryCtas && secondaryCtas.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0 text-sm text-white/80">
            {secondaryCtas.map((cta, index) => (
              <Fragment key={cta.href}>
                {index > 0 && (
                  <span className="hidden sm:inline text-white/50">•</span>
                )}
                <Link
                  href={cta.href}
                  target={cta.external ? "_blank" : undefined}
                  rel={cta.external ? "noreferrer" : undefined}
                  className="hover:text-white transition-all duration-200"
                >
                  {cta.label}
                </Link>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
