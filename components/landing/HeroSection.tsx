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
  const mobileMenuPanel = useRef<HTMLDivElement | null>(null);
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
        gsap.set("[data-hero-item], [data-quick-fact], [data-chip]", {
          clearProps: "all",
        });
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

        const quickFacts = gsap.utils.toArray<HTMLElement>("[data-quick-fact]", root.current);
        const chips = gsap.utils.toArray<HTMLElement>("[data-chip]", root.current);
        const quickFactsStart = window.innerWidth < 768 ? "top 92%" : "top 86%";
        const chipsStart = window.innerWidth < 768 ? "top 92%" : "top 86%";

        quickFacts.forEach((fact, index) => {
          gsap.from(fact, {
            scrollTrigger: {
              trigger: fact,
              start: quickFactsStart,
              toggleActions: "restart none restart reset",
            },
            y: 18,
            x: window.innerWidth < 768 ? (index % 2 === 0 ? -10 : 10) : 0,
            autoAlpha: 0,
            duration: 0.54,
            ease: "power3.out",
          });
        });

        chips.forEach((chip, index) => {
          gsap.from(chip, {
            scrollTrigger: {
              trigger: chip,
              start: chipsStart,
              toggleActions: "restart none restart reset",
            },
            y: 16,
            x: window.innerWidth < 768 ? (index % 2 === 0 ? -10 : 10) : 0,
            autoAlpha: 0,
            duration: 0.46,
            ease: "power2.out",
            delay: index * 0.02,
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  useGSAP(
    () => {
      if (!mobileMenu.current || !mobileMenuPanel.current) {
        return;
      }

      if (isMobileMenuOpen) {
        gsap.set(mobileMenu.current, { pointerEvents: "auto" });
        gsap.to(mobileMenu.current, {
          autoAlpha: 1,
          duration: 0.18,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.fromTo(
          mobileMenuPanel.current,
          { autoAlpha: 0, y: -18, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.28,
            ease: "power3.out",
            overwrite: "auto",
          }
        );
      } else {
        gsap.to(mobileMenuPanel.current, {
          autoAlpha: 0,
          y: -18,
          scale: 0.98,
          duration: 0.18,
          ease: "power2.in",
          overwrite: "auto",
        });
        gsap.to(mobileMenu.current, {
          autoAlpha: 0,
          pointerEvents: "none",
          duration: 0.18,
          delay: 0.03,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
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
                      className="scale-[1.045] object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.075] group-active:scale-[1.075] sm:scale-100 sm:object-top sm:group-hover:scale-[1.055] sm:group-active:scale-[1.055]"
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

        <div className="mt-8 grid grid-cols-2 auto-rows-fr gap-2.5 pb-6 sm:gap-3 lg:grid-cols-4">
          <a
            data-cta
            data-hero-item
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary w-full px-4 py-3 text-[0.7rem] tracking-[0.16em] sm:text-[0.78rem] sm:tracking-[0.18em]"
          >
            {hero.primaryAction}
          </a>
          <a
            data-cta
            data-hero-item
            href={`mailto:${profile.email}`}
            className="button-secondary w-full px-4 py-3 text-[0.7rem] tracking-[0.16em] sm:text-[0.78rem] sm:tracking-[0.18em]"
          >
            {hero.emailAction}
          </a>
          <a
            data-cta
            data-hero-item
            href={profile.resumeEsUrl}
            target="_blank"
            rel="noreferrer"
            className="button-secondary w-full px-4 py-3 text-[0.7rem] tracking-[0.16em] sm:text-[0.78rem] sm:tracking-[0.18em]"
          >
            {hero.resumeEsAction}
          </a>
          <a
            data-cta
            data-hero-item
            href={profile.resumeEnUrl}
            target="_blank"
            rel="noreferrer"
            className="button-secondary w-full px-4 py-3 text-[0.7rem] tracking-[0.16em] sm:text-[0.78rem] sm:tracking-[0.18em]"
          >
            {hero.resumeEnAction}
          </a>
        </div>

        <div className="grid grid-cols-2 auto-rows-fr gap-2.5 pb-6 sm:gap-3 lg:grid-cols-4">
          {hero.quickFacts.map((fact) => (
            <article
              key={`${fact.label}-${fact.value}`}
              data-quick-fact
              tabIndex={0}
              className="card-hover-blue group flex h-full min-h-26 flex-col justify-between rounded-[1.4rem] border border-(--line) bg-white/78 px-5 py-4 shadow-[0_16px_36px_rgba(27,59,90,0.05)]"
            >
              <p className="card-hover-subtle text-[0.7rem] uppercase tracking-[0.22em] text-(--muted) transition-colors duration-200 group-hover:text-white/72 group-focus-within:text-white/72 group-active:text-white/72">
                {fact.label}
              </p>
              <p className="card-hover-primary mt-2 text-sm leading-7 text-(--ink) transition-colors duration-200 group-hover:text-white group-focus-within:text-white group-active:text-white">
                {fact.value}
              </p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-2 auto-rows-fr gap-2.5 pb-10 sm:gap-3 lg:grid-cols-4">
          {heroChips.map((chip) => (
            <span
              key={chip}
              data-chip
              className="chip flex h-full min-h-14 items-center justify-center px-3 text-center text-[0.84rem] leading-5 sm:min-h-16 sm:px-4 sm:text-[0.95rem]"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div
        ref={mobileMenu}
        id="mobile-hero-menu"
        className="pointer-events-none fixed inset-0 z-[220] opacity-0 lg:hidden"
      >
        <div
          ref={mobileMenuPanel}
          className="relative min-h-screen bg-white px-7 pb-12 pt-7"
        >
          <button
            type="button"
            aria-label={locale === "es" ? "Cerrar menú" : "Close menu"}
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute right-6 top-7 inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--line) bg-white"
          >
            <span
              className="relative block h-5 w-5 before:absolute before:left-1/2 before:top-1/2 before:h-0.5 before:w-5 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:rounded-full before:bg-(--ink) after:absolute after:left-1/2 after:top-1/2 after:h-0.5 after:w-5 after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45 after:rounded-full after:bg-(--ink)"
              aria-hidden="true"
            />
          </button>

          <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-80 flex-col items-center justify-center text-center">
            <div className="inline-flex w-fit items-center gap-1 rounded-full border border-(--line) bg-white p-1 shadow-[0_10px_24px_rgba(27,59,90,0.06)]">
              <span className="sr-only">{hero.localeLabel}</span>
              <button
                type="button"
                onClick={() => setLocale("es")}
                aria-pressed={locale === "es"}
                className={`rounded-full px-5 py-2.5 text-[0.72rem] font-semibold tracking-[0.18em] ${
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
                className={`rounded-full px-5 py-2.5 text-[0.72rem] font-semibold tracking-[0.18em] ${
                  locale === "en"
                    ? "bg-(--accent) text-white shadow-[0_10px_24px_rgba(0,119,182,0.22)]"
                    : "text-(--ink)"
                }`}
              >
                EN
              </button>
            </div>

            <p className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-(--muted)">
              {locale === "es" ? "Navegación" : "Navigation"}
            </p>
            <h2 className="mt-4 text-balance text-center text-[1.95rem] leading-[1.02] text-(--ink)">
              {profile.name}
            </h2>
            <p className="mt-3 max-w-72 text-center text-sm leading-6 text-(--muted)">
              {locale === "es"
                ? "Recorre el portfolio por secciones y ve directo a lo más importante."
                : "Browse the portfolio by section and jump straight to what matters."}
            </p>

            <nav
              aria-label={locale === "es" ? "Navegación principal" : "Primary navigation"}
              className="mt-10 flex w-full flex-col items-center gap-6 rounded-[2rem] border border-(--line) bg-white/88 px-8 py-8 shadow-[0_18px_40px_rgba(27,59,90,0.08)]"
            >
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center text-[1.02rem] font-semibold uppercase tracking-[0.18em] text-(--ink)"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
