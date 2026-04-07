"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { createDownwardReveal } from "@/lib/gsap-scroll-reveal";
import { SectionHeading } from "./SectionHeading";
import { usePortfolioLocale } from "./PortfolioLocaleProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function StackDepthSection() {
  const root = useRef<HTMLElement | null>(null);
  const { content } = usePortfolioLocale();
  const { credentialGroups, credentialsSection } = content;
  const [certificationsGroup, educationGroup, collaborationGroup] = credentialGroups;

  function parseEducationItem(item: string) {
    const [institution, degree] = item.split(" - ");
    return {
      institution: institution ?? item,
      degree: degree ?? "",
    };
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        createDownwardReveal({
          target: gsap.utils.toArray<HTMLElement>("[data-credentials-intro-item]", root.current),
          trigger: root.current,
          start: "top 78%",
          from: {
            y: 26,
            autoAlpha: 0,
          },
          to: {
            y: 0,
            autoAlpha: 1,
            stagger: 0.08,
            duration: 0.7,
            ease: "power3.out",
          },
        });

        const cards = gsap.utils.toArray<HTMLElement>("[data-credential-card]");

        cards.forEach((card, index) => {
          createDownwardReveal({
            target: card,
            start: "top 80%",
            from: {
              x: index % 2 === 0 ? -26 : 26,
              y: 34,
              scale: 0.965,
              autoAlpha: 0,
            },
            to: {
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.86,
              ease: "power3.out",
            },
          });

          const entries = card.querySelectorAll<HTMLElement>("[data-credential-entry]");

          createDownwardReveal({
            target: entries,
            trigger: card,
            start: "top 74%",
            from: {
              y: 16,
              autoAlpha: 0,
            },
            to: {
              y: 0,
              autoAlpha: 1,
              stagger: 0.06,
              duration: 0.5,
              ease: "power2.out",
            },
          });
        });

        if (window.innerWidth >= 1024) {
          cards.forEach((card) => {
            const setState = (active: boolean) => {
              gsap.to(card, {
                y: active ? -8 : 0,
                scale: active ? 1.018 : 1,
                borderColor: active ? "rgba(0, 119, 182, 0.22)" : "rgba(27, 59, 90, 0.08)",
                boxShadow: active
                  ? "0 28px 68px rgba(0, 119, 182, 0.14)"
                  : "0 16px 40px rgba(27, 59, 90, 0.06)",
                duration: 0.28,
                ease: "power2.out",
                overwrite: "auto",
              });
            };

            ScrollTrigger.create({
              trigger: card,
              start: "top 62%",
              end: "bottom 42%",
              onEnter: () => setState(true),
              onEnterBack: () => setState(true),
              onLeave: () => setState(false),
              onLeaveBack: () => setState(false),
            });
          });
        }

      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="credenciales-title" className="section-spacing">
      <div className="shell">
        <div>
          <div data-credentials-intro-item>
            <SectionHeading
              id="credenciales-title"
              eyebrow={credentialsSection.eyebrow}
              title={credentialsSection.title}
              copy={credentialsSection.copy}
            />
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-5xl space-y-5">
          <article
            data-credential-card
            className="panel-soft rounded-4xl border border-(--line) p-6 sm:p-7"
          >
            <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
              <div data-credential-entry>
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-(--accent-strong)">
                  01
                </p>
                <h3 className="mt-4 text-3xl leading-tight text-(--ink)">
                  {educationGroup.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-(--muted)">
                  {educationGroup.description}
                </p>
              </div>

              <ul className="grid gap-3">
                {educationGroup.items.map((item) => {
                  const parsed = parseEducationItem(item);

                  return (
                    <li
                      key={item}
                      data-credential-entry
                      className="rounded-[1.25rem] border border-(--line) bg-white/82 px-5 py-5"
                    >
                      <p className="text-[0.72rem] uppercase tracking-[0.18em] text-(--muted)">
                        {parsed.institution}
                      </p>
                      {parsed.degree ? (
                        <p className="mt-3 text-lg font-semibold leading-8 text-(--ink)">
                          {parsed.degree}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>

          <article
            data-credential-card
            className="panel-soft rounded-4xl border border-(--line) p-6 sm:p-7"
          >
            <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
              <div data-credential-entry>
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-(--accent-strong)">
                  02
                </p>
                <h3 className="mt-4 text-3xl leading-tight text-(--ink)">
                  {certificationsGroup.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-(--muted)">
                  {certificationsGroup.description}
                </p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {certificationsGroup.items.map((item) => (
                  <li
                    key={item}
                    data-credential-entry
                    className="flex min-h-26 items-center justify-center rounded-[1.25rem] border border-(--line) bg-white/82 px-5 py-5 text-center"
                  >
                    <p className="text-base leading-7 text-(--ink)">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article
            data-credential-card
            className="panel-soft rounded-4xl border border-(--line) p-6 sm:p-7"
          >
            <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
              <div data-credential-entry>
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-(--accent-strong)">
                  03
                </p>
                <h3 className="mt-4 text-3xl leading-tight text-(--ink)">
                  {collaborationGroup.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-(--muted)">
                  {collaborationGroup.description}
                </p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {collaborationGroup.items.map((item) => (
                  <li
                    key={item}
                    data-credential-entry
                    className="flex min-h-24 items-center rounded-[1.25rem] border border-(--line) bg-white/82 px-5 py-4"
                  >
                    <p className="text-base leading-7 text-(--ink)">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
