"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioLocale } from "./PortfolioLocaleProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type HeroSectionProps = {
  portraitSrc: string | null;
};

export function HeroSection({ portraitSrc }: HeroSectionProps) {
  const root = useRef<HTMLElement | null>(null);
  const mobileMenu = useRef<HTMLDivElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, setLocale, content } = usePortfolioLocale();
  const { hero, heroChips, navigationItems, profile } = content;
  const initials = profile.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero-item]", { clearProps: "all" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.84 },
        });

        tl.from("[data-nav]", { y: -18, autoAlpha: 0, duration: 0.58 })
          .from("[data-kicker]", { y: 20, autoAlpha: 0 }, "-=0.36")
          .from("[data-title]", { yPercent: 18, autoAlpha: 0 }, "-=0.32")
          .from("[data-headline]", { y: 22, autoAlpha: 0 }, "-=0.4")
          .from("[data-intro]", { y: 18, autoAlpha: 0 }, "-=0.44")
          .from("[data-visual]", { x: 30, autoAlpha: 0, duration: 0.92 }, "-=0.68")
          .from("[data-portrait-stage]", { y: 20, autoAlpha: 0, duration: 0.9 }, "-=0.72")
          .from("[data-cta]", { y: 14, autoAlpha: 0, stagger: 0.08 }, "-=0.46")
          .from("[data-quick-fact]", { y: 12, autoAlpha: 0, stagger: 0.05 }, "-=0.36")
          .from("[data-chip]", { y: 12, autoAlpha: 0, stagger: 0.04 }, "-=0.34")
          .to(
            "[data-ambient]",
            {
              "--hero-glow": 1,
              duration: 1.1,
              ease: "power2.out",
            },
            0.08
          );

        gsap.to("[data-portrait-image]", {
          y: 22,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  useGSAP(
    () => {
      if (!mobileMenu.current) {
        return;
      }

      gsap.to(mobileMenu.current, {
        autoAlpha: isMobileMenuOpen ? 1 : 0,
        y: isMobileMenuOpen ? 0 : -12,
        pointerEvents: isMobileMenuOpen ? "auto" : "none",
        duration: 0.24,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    { scope: root, dependencies: [isMobileMenuOpen] }
  );

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className="noise relative pt-6"
      style={{ "--hero-glow": 0.78 } as CSSProperties}
    >
      <div
        data-ambient
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-184 bg-[radial-gradient(circle_at_12%_14%,rgba(0,119,182,0.16),transparent_34%),radial-gradient(circle_at_84%_8%,rgba(27,59,90,0.1),transparent_26%)]"
        style={{ opacity: "var(--hero-glow)" }}
      />

      <div className="shell relative z-10">
        <header
          data-nav
          className="border-b border-(--line) pb-6"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-(--ink)">
              {profile.name}
            </span>

            <div className="flex items-center gap-3">
              <nav
                aria-label={locale === "es" ? "Navegación principal" : "Primary navigation"}
                className="hidden items-center gap-3 lg:flex"
              >
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-(--muted) transition-all duration-200 hover:text-(--accent-strong)"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="inline-flex w-fit items-center gap-1 rounded-full border border-(--line) bg-white/82 p-1">
                <span className="sr-only">{hero.localeLabel}</span>
                <button
                  type="button"
                  onClick={() => setLocale("es")}
                  aria-pressed={locale === "es"}
                  className={`rounded-full px-4 py-2 text-[0.72rem] font-semibold tracking-[0.18em] ${
                    locale === "es"
                      ? "bg-(--accent) text-white shadow-[0_10px_24px_rgba(0,119,182,0.22)]"
                      : "text-(--ink)"
                  }`}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  aria-pressed={locale === "en"}
                  className={`rounded-full px-4 py-2 text-[0.72rem] font-semibold tracking-[0.18em] ${
                    locale === "en"
                      ? "bg-(--accent) text-white shadow-[0_10px_24px_rgba(0,119,182,0.22)]"
                      : "text-(--ink)"
                  }`}
                >
                  EN
                </button>
              </div>

              <button
                type="button"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-hero-menu"
                aria-label={locale === "es" ? "Abrir menú" : "Open menu"}
                onClick={() => setIsMobileMenuOpen((current) => !current)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--line) bg-white/82 lg:hidden"
              >
                <span className="flex flex-col gap-1.5">
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-(--ink) transition-transform duration-200 ${
                      isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-(--ink) transition-opacity duration-200 ${
                      isMobileMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-(--ink) transition-transform duration-200 ${
                      isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          <div className="relative lg:hidden">
            <div
              ref={mobileMenu}
              id="mobile-hero-menu"
              className="pointer-events-none absolute right-0 top-4 z-20 min-w-52 rounded-[1.4rem] border border-(--line) bg-white/94 p-4 opacity-0 shadow-[0_20px_48px_rgba(27,59,90,0.12)] backdrop-blur-md"
            >
              <nav
                aria-label={locale === "es" ? "Navegación principal" : "Primary navigation"}
                className="flex flex-col gap-3"
              >
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-(--ink) transition-colors duration-200 hover:text-(--accent-strong)"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </header>

        <div className="grid items-end gap-10 pt-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:pt-16">
          <div className="max-w-3xl">
            <span data-kicker data-hero-item className="eyebrow">
              {hero.kicker}
            </span>

            <h1
              id="hero-title"
              data-title
              data-hero-item
              className="mt-8 text-[3.2rem] leading-[0.9] text-balance text-(--ink) sm:text-[4.6rem] lg:text-[6rem]"
            >
              {profile.name}
            </h1>

            <p
              data-headline
              data-hero-item
              className="mt-6 max-w-3xl text-2xl leading-9 text-(--accent-strong) sm:text-[2.1rem]"
            >
              {profile.headline}
            </p>

            <p
              data-intro
              data-hero-item
              className="mt-7 max-w-2xl text-base leading-8 text-(--muted) sm:text-lg"
            >
              {profile.intro}
            </p>
          </div>

          <div data-visual data-hero-item className="relative flex items-end justify-center py-2">
            <div
              aria-hidden="true"
              className="absolute inset-x-[10%] top-[6%] bottom-[4%] rounded-[3rem] bg-[radial-gradient(circle_at_top_right,rgba(0,119,182,0.1),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(27,59,90,0.08),transparent_26%)]"
            />
            <div
              data-portrait-stage
              className="panel-soft group relative w-full max-w-136 overflow-hidden rounded-[2.6rem] p-0 sm:max-w-140 lg:max-w-xl"
            >
              <div className="relative aspect-2/3 w-full overflow-hidden rounded-[2.6rem] bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
                {portraitSrc ? (
                  <div data-portrait-image className="absolute inset-0">
                    <Image
                      src={portraitSrc}
                      alt={profile.portraitAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 44vw"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.055]"
                    />
                  </div>
                ) : (
                  <div className="flex h-full flex-col justify-between rounded-[2.3rem] bg-[radial-gradient(circle_at_top_left,rgba(0,119,182,0.2),transparent_30%),linear-gradient(180deg,#315d84_0%,#1b3b5a_100%)] p-8 text-white">
                    <div className="space-y-3">
                      <p className="text-[0.72rem] uppercase tracking-[0.28em] text-white/72">
                        Jose Luis Riascos Murillo
                      </p>
                      <p className="max-w-60 text-xl leading-8 text-white/92">
                        Arquitectura, automatización y ejecución técnica con visión de producto.
                      </p>
                    </div>
                    <span className="font-display text-9xl leading-none text-white/24">
                      {initials}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid auto-rows-fr gap-3 pb-6 sm:grid-cols-2 lg:grid-cols-4">
          <a
            data-cta
            data-hero-item
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary w-full"
          >
            {hero.primaryAction}
          </a>
          <a
            data-cta
            data-hero-item
            href={`mailto:${profile.email}`}
            className="button-secondary w-full"
          >
            {hero.emailAction}
          </a>
          <a
            data-cta
            data-hero-item
            href={profile.resumeEsUrl}
            target="_blank"
            rel="noreferrer"
            className="button-secondary w-full"
          >
            {hero.resumeEsAction}
          </a>
          <a
            data-cta
            data-hero-item
            href={profile.resumeEnUrl}
            target="_blank"
            rel="noreferrer"
            className="button-secondary w-full"
          >
            {hero.resumeEnAction}
          </a>
        </div>

        <div className="grid auto-rows-fr gap-3 pb-6 sm:grid-cols-2 lg:grid-cols-4">
          {hero.quickFacts.map((fact) => (
            <article
              key={`${fact.label}-${fact.value}`}
              data-quick-fact
              className="card-hover-blue group flex h-full min-h-26 flex-col justify-between rounded-[1.4rem] border border-(--line) bg-white/78 px-5 py-4 shadow-[0_16px_36px_rgba(27,59,90,0.05)]"
            >
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-(--muted) transition-colors duration-200 group-hover:text-white/72">
                {fact.label}
              </p>
              <p className="mt-2 text-sm leading-7 text-(--ink) transition-colors duration-200 group-hover:text-white">
                {fact.value}
              </p>
            </article>
          ))}
        </div>

        <div className="grid auto-rows-fr gap-3 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          {heroChips.map((chip) => (
            <span
              key={chip}
              data-chip
              className="chip flex h-full min-h-16 items-center justify-center px-4 text-center text-[0.95rem] leading-5"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
