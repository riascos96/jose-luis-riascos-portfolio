"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "./SectionHeading";
import { usePortfolioLocale } from "./PortfolioLocaleProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ArchitectureSection() {
  const root = useRef<HTMLElement | null>(null);
  const { content } = usePortfolioLocale();
  const { profileSection, structuredFacts, humanSummaryParagraphs, skillDomains } = content;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const animateSummary = (start: string) => {
        const summaryParagraphs = gsap.utils.toArray<HTMLElement>(
          "[data-summary-paragraph]",
          root.current
        );

        summaryParagraphs.forEach((paragraph) => {
          gsap.from(paragraph, {
            scrollTrigger: {
              trigger: paragraph,
              start,
              toggleActions: "restart none restart reset",
            },
            y: 22,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        });
      };

      const animateFacts = (start: string, mobile = false) => {
        const factItems = gsap.utils.toArray<HTMLElement>("[data-fact-item]", root.current);

        factItems.forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start,
              toggleActions: "restart none restart reset",
            },
            y: 18,
            x: mobile ? (index % 2 === 0 ? -10 : 10) : 0,
            scale: 0.975,
            autoAlpha: 0,
            duration: 0.56,
            ease: "power2.out",
          });
        });
      };

      const animateDomains = (cardStart: string, chipStart: string, mobile = false) => {
        const domainCards = gsap.utils.toArray<HTMLElement>("[data-domain-card]", root.current);

        domainCards.forEach((card, index) => {
          const chips = card.querySelectorAll<HTMLElement>("[data-domain-chip]");

          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: cardStart,
              toggleActions: "restart none restart reset",
            },
            y: 24,
            x: mobile ? (index % 2 === 0 ? -12 : 12) : 0,
            scale: 0.97,
            autoAlpha: 0,
            duration: 0.64,
            ease: "power3.out",
          });

          gsap.from(chips, {
            scrollTrigger: {
              trigger: card,
              start: chipStart,
              toggleActions: "restart none restart reset",
            },
            y: 12,
            autoAlpha: 0,
            stagger: 0.04,
            duration: 0.38,
            ease: "power2.out",
          });
        });
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          "[data-summary-paragraph], [data-fact-item], [data-domain-card], [data-domain-chip]",
          { clearProps: "all" }
        );
      });

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        animateSummary("top 92%");
        animateFacts("top 92%", true);
        animateDomains("top 90%", "top 88%", true);
      });

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        animateSummary("top 86%");
        animateFacts("top 86%");
        animateDomains("top 84%", "top 82%");
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="ficha" ref={root} aria-labelledby="ficha-title" className="section-spacing">
      <div className="shell">
        <SectionHeading
          id="ficha-title"
          eyebrow={profileSection.eyebrow}
          title={profileSection.title}
          copy={profileSection.copy}
        />

        <div className="mt-14 grid gap-5  xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <article className="panel-soft rounded-4xl p-6 sm:p-7">
            <p className="text-[0.72rem] uppercase tracking-[0.26em] text-(--accent-strong)">
              {profileSection.summaryEyebrow}
            </p>

            <div className="mt-6 space-y-5">
              {humanSummaryParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  data-summary-paragraph
                  className="text-base leading-8 text-(--muted)"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <div className="panel rounded-4xl p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.26em] text-(--muted)">
                  {profileSection.factsEyebrow}
                </p>
                <p className="mt-3 text-2xl leading-tight text-(--ink)">
                  {profileSection.factsTitle}
                </p>
              </div>
              <span className="rounded-full border border-(--line) bg-white/78 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-(--accent-strong)">
                {profileSection.factsTag}
              </span>
            </div>

            <dl data-facts-grid className="mt-8 grid auto-rows-fr gap-3 sm:grid-cols-2">
              {structuredFacts.map((fact) => (
                <div
                  key={fact.label}
                  data-fact-item
                  tabIndex={0}
                  className="card-hover-blue group flex h-full flex-col rounded-[1.3rem] border border-(--line) bg-white/72 px-4 py-4"
                >
                  <dt className="card-hover-subtle text-[0.7rem] uppercase tracking-[0.2em] text-(--muted) transition-colors duration-200 group-hover:text-white/70 group-focus-within:text-white/70 group-active:text-white/70">
                    {fact.label}
                  </dt>
                  <dd className="card-hover-primary mt-2 text-sm leading-7 text-(--ink) transition-colors duration-200 group-hover:text-white group-focus-within:text-white group-active:text-white">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="panel-soft rounded-4xl px-6 py-8 sm:px-8 sm:py-10 xl:col-span-2">
            <p className="text-[0.72rem] uppercase tracking-[0.26em] text-(--accent-strong)">
              {profileSection.keywordsEyebrow}
            </p>
            <p className="mt-3 max-w-3xl text-2xl leading-tight text-(--ink) sm:text-[2.15rem]">
              {profileSection.keywordsTitle}
            </p>
            <p className="mt-5 max-w-4xl text-sm leading-7 text-(--muted) sm:text-[0.98rem]">
              {profileSection.keywordsCopy}
            </p>

            <div data-domains-grid className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {skillDomains.map((domain) => {
                return (
                  <article
                    key={domain.title}
                    data-domain-card
                    className="rounded-[1.65rem] border border-(--line) bg-white/88 p-5 shadow-[0_14px_34px_rgba(27,59,90,0.06)] sm:p-6"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="chip inline-flex min-w-[4.2rem] items-center justify-center border-[#d7e8f4] bg-[#f6fbfe] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] !text-[#0077b6] hover:!text-white active:!text-white focus-visible:!text-white"
                      >
                        {domain.code}
                      </span>
                    </div>

                    <h3 className="mt-5 text-[1.55rem] leading-tight text-(--ink)">
                      {domain.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-(--muted)">
                      {domain.copy}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {domain.skills.map((skill) => (
                        <span
                          key={skill}
                          data-domain-chip
                          className="chip border-[#d7e8f4] bg-[#f6fbfe] !text-[#0077b6] hover:!text-white active:!text-white focus-visible:!text-white"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
