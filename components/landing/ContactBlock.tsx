"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePortfolioLocale } from "./PortfolioLocaleProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ContactBlock() {
  const root = useRef<HTMLElement | null>(null);
  const { content } = usePortfolioLocale();
  const { contactSection, profile } = content;

  const actionCards = [
    {
      label: "LinkedIn",
      value: contactSection.openLinkedInAction,
      detail: profile.linkedinUrl.replace(/^https?:\/\//, ""),
      href: profile.linkedinUrl,
      external: true,
      tone: "primary",
    },
    {
      label: "Email",
      value: contactSection.writeEmailAction,
      detail: profile.email,
      href: `mailto:${profile.email}`,
      external: false,
      tone: "secondary",
    },
    {
      label: "CV ES",
      value: contactSection.resumeEsAction,
      detail: "Descarga inmediata",
      href: profile.resumeEsUrl,
      external: true,
      tone: "secondary",
    },
    {
      label: "CV EN",
      value: contactSection.resumeEnAction,
      detail: "Immediate download",
      href: profile.resumeEnUrl,
      external: true,
      tone: "secondary",
    },
  ] as const;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const animateIntro = (start: string) => {
        gsap.from("[data-contact-item]", {
          scrollTrigger: {
            trigger: root.current,
            start,
            toggleActions: "restart none restart reset",
          },
          y: 20,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.68,
          ease: "power3.out",
        });
      };

      const animateCards = (start: string, mobile = false) => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-contact-card]", root.current);

        cards.forEach((card, index) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start,
              toggleActions: "restart none restart reset",
            },
            y: 24,
            x: mobile ? (index % 2 === 0 ? -10 : 10) : 0,
            scale: 0.97,
            autoAlpha: 0,
            duration: 0.64,
            ease: "power3.out",
          });
        });
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-contact-item], [data-contact-card]", { clearProps: "all" });
      });

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        animateIntro("top 88%");
        animateCards("top 92%", true);
      });

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        animateIntro("top 84%");
        animateCards("top 86%");
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="contacto" ref={root} aria-labelledby="contacto-title" className="pb-20 pt-8">
      <div className="shell">
        <div className="panel-soft relative overflow-hidden rounded-[2.4rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,119,182,0.1),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(27,59,90,0.08),transparent_28%)]"
          />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:items-stretch">
            <div className="relative z-10 flex h-full max-w-3xl flex-col">
              <span data-contact-item className="eyebrow w-fit">
                {contactSection.eyebrow}
              </span>
              <h2
                id="contacto-title"
                data-contact-item
                className="mt-6 max-w-3xl text-4xl leading-[0.96] text-(--ink) sm:text-5xl"
              >
                {contactSection.title}
              </h2>
              <p
                data-contact-item
                className="mt-6 max-w-2xl text-base leading-8 text-(--muted) sm:text-lg"
              >
                {contactSection.copy}
              </p>
            </div>

            <div
              data-contact-item
              className="relative z-10 rounded-4xl border border-(--line) bg-white/78 p-5 shadow-[0_16px_36px_rgba(27,59,90,0.06)] backdrop-blur-md sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-(--accent-strong)">
                    Contacto directo
                  </p>
                  <h3 className="mt-3 text-3xl leading-tight text-(--ink)">
                    Elige el canal que prefieras.
                  </h3>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {actionCards.map((action) => (
                  <a
                    key={action.label}
                    data-contact-card
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noreferrer" : undefined}
                    className={`group flex min-h-32 flex-col justify-between rounded-[1.6rem] border p-5 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(27,59,90,0.12)] ${
                      action.tone === "primary"
                        ? "border-(--accent-strong) bg-(--accent-strong) text-white"
                        : "border-(--line) bg-white text-(--ink) hover:border-(--accent-strong) hover:bg-(--accent-strong) hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`text-[0.72rem] font-semibold uppercase tracking-[0.22em] ${
                          action.tone === "primary"
                            ? "text-white/72"
                            : "text-(--muted) group-hover:text-white/72"
                        }`}
                      >
                        {action.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`text-base transition-transform duration-300 group-hover:translate-x-1 ${
                          action.tone === "primary"
                            ? "text-white/88"
                            : "text-(--accent-strong) group-hover:text-white"
                        }`}
                      >
                        →
                      </span>
                    </div>

                    <div className="mt-5">
                      <p
                        className={`text-[1.15rem] font-semibold leading-7 ${
                          action.tone === "primary"
                            ? "text-white"
                            : "text-(--ink) group-hover:text-white"
                        }`}
                      >
                        {action.value}
                      </p>
                      <p
                        className={`mt-2 text-sm leading-6 ${
                          action.tone === "primary"
                            ? "text-white/72"
                            : "text-(--muted) group-hover:text-white/78"
                        }`}
                      >
                        {action.detail}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
