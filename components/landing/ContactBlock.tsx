"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePortfolioLocale } from "./PortfolioLocaleProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

type ContactFormErrors = Partial<Record<keyof Omit<ContactFormState, "website">, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactBlock() {
  const root = useRef<HTMLElement | null>(null);
  const { content, locale } = usePortfolioLocale();
  const { contactSection, profile } = content;
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "fallback">("idle");
  const actionCards = [
    {
      label: "LinkedIn",
      value: contactSection.openLinkedInAction,
      href: profile.linkedinUrl,
      external: true,
    },
    {
      label: "Email",
      value: contactSection.writeEmailAction,
      href: `mailto:${profile.email}`,
      external: false,
    },
    {
      label: "CV ES",
      value: contactSection.resumeEsAction,
      href: profile.resumeEsUrl,
      external: true,
    },
    {
      label: "CV EN",
      value: contactSection.resumeEnAction,
      href: profile.resumeEnUrl,
      external: true,
    },
  ] as const;

  const formEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() ?? "";
  const subjectPrefix =
    process.env.NEXT_PUBLIC_CONTACT_SUBJECT_PREFIX?.trim() || "[Portfolio Jose Luis Riascos]";

  function updateField(field: keyof ContactFormState, value: string) {
    setFormState((current) => ({ ...current, [field]: value }));
    if (field !== "website") {
      const errorField = field as keyof Omit<ContactFormState, "website">;
      setErrors((current) => {
        if (!current[errorField]) {
          return current;
        }

        const next = { ...current };
        delete next[errorField];
        return next;
      });
    }
  }

  function buildPrefixedSubject(subject: string) {
    return `${subjectPrefix} ${subject}`.trim();
  }

  function validateField(field: keyof Omit<ContactFormState, "website">, value: string) {
    const trimmed = value.trim();

    switch (field) {
      case "name":
        if (trimmed.length < 2) {
          return contactSection.validationNameRequired;
        }
        return "";
      case "email":
        if (!EMAIL_REGEX.test(trimmed)) {
          return contactSection.validationEmailInvalid;
        }
        return "";
      case "subject":
        if (trimmed.length < 3) {
          return contactSection.validationSubjectRequired;
        }
        return "";
      case "message":
        if (!trimmed) {
          return contactSection.validationMessageRequired;
        }
        if (trimmed.length < 20) {
          return contactSection.validationMessageLength;
        }
        return "";
      default:
        return "";
    }
  }

  function validateForm() {
    const nextErrors: ContactFormErrors = {};

    const fields: Array<keyof Omit<ContactFormState, "website">> = ["name", "email", "subject", "message"];

    fields.forEach((field) => {
      const error = validateField(field, formState[field]);
      if (error) {
        nextErrors[field] = error;
      }
    });

    setErrors(nextErrors);
    return nextErrors;
  }

  function openMailClient() {
    const subject = encodeURIComponent(
      buildPrefixedSubject(formState.subject || (locale === "es" ? "Nuevo contacto" : "New contact"))
    );
    const body = encodeURIComponent(
      [
        `Nombre: ${formState.name}`,
        `Email: ${formState.email}`,
        `Origen: ${window.location.href}`,
        "",
        formState.message,
      ].join("\n")
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");

    if (formState.website.trim()) {
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!formEndpoint) {
      setStatus("fallback");
      openMailClient();
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = new FormData();
      payload.append("name", formState.name.trim());
      payload.append("email", formState.email.trim());
      payload.append("subject", buildPrefixedSubject(formState.subject.trim()));
      payload.append("message", formState.message.trim());
      payload.append("locale", locale);
      payload.append("page", window.location.href);
      payload.append("source", "portfolio-jose-luis-riascos");

      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error("Contact form request failed");
      }

      setStatus("success");
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
        website: "",
      });
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-contact-item]", {
          scrollTrigger: {
            trigger: root.current,
            start: "top 84%",
            toggleActions: "restart none restart reset",
          },
          y: 20,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.68,
          ease: "power3.out",
        });
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

              <div className="mt-6 grid gap-3 pt-6 sm:grid-cols-2">
                {actionCards.map((action) => (
                  <a
                    key={action.label}
                    data-contact-item
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noreferrer" : undefined}
                    className={`w-full hover:scale-[1.03] ${
                      action.label === "LinkedIn"
                        ? "button-primary"
                        : "button-secondary"
                    }`}
                  >
                    {action.value}
                  </a>
                ))}
              </div>
            </div>

            <form
              data-contact-item
              onSubmit={handleSubmit}
              className="relative z-10 rounded-4xl border border-(--line) bg-white/78 p-5 shadow-[0_16px_36px_rgba(27,59,90,0.06)] backdrop-blur-md sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-(--accent-strong)">
                    {contactSection.formEyebrow}
                  </p>
                  <h3 className="mt-3 text-3xl leading-tight text-(--ink)">
                    {contactSection.formTitle}
                  </h3>
                </div>
                <span className="rounded-full border border-(--line) bg-(--accent-soft) px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-(--accent-strong)">
                  {locale.toUpperCase()}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[0.72rem] uppercase tracking-[0.18em] text-(--muted)">
                    {contactSection.nameLabel}
                  </span>
                  <input
                    required
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formState.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    onBlur={(event) =>
                      setErrors((current) => ({
                        ...current,
                        name: validateField("name", event.target.value) || undefined,
                      }))
                    }
                    placeholder={contactSection.namePlaceholder}
                    aria-invalid={Boolean(errors.name)}
                    className="mt-2 w-full rounded-[1.2rem] border border-(--line) bg-white px-4 py-3 text-base text-(--ink) placeholder:text-(--muted)"
                  />
                  {errors.name ? (
                    <p className="mt-2 text-sm leading-6 text-[#b42318]">{errors.name}</p>
                  ) : null}
                </label>

                <label className="block">
                  <span className="text-[0.72rem] uppercase tracking-[0.18em] text-(--muted)">
                    {contactSection.emailLabel}
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formState.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    onBlur={(event) =>
                      setErrors((current) => ({
                        ...current,
                        email: validateField("email", event.target.value) || undefined,
                      }))
                    }
                    placeholder={contactSection.emailPlaceholder}
                    aria-invalid={Boolean(errors.email)}
                    className="mt-2 w-full rounded-[1.2rem] border border-(--line) bg-white px-4 py-3 text-base text-(--ink) placeholder:text-(--muted)"
                  />
                  {errors.email ? (
                    <p className="mt-2 text-sm leading-6 text-[#b42318]">{errors.email}</p>
                  ) : null}
                </label>
              </div>

              <label className="mt-4 block">
                <span className="text-[0.72rem] uppercase tracking-[0.18em] text-(--muted)">
                  {contactSection.subjectLabel}
                </span>
                <input
                  required
                  type="text"
                  name="subject"
                  autoComplete="off"
                  value={formState.subject}
                  onChange={(event) => updateField("subject", event.target.value)}
                  onBlur={(event) =>
                    setErrors((current) => ({
                      ...current,
                      subject: validateField("subject", event.target.value) || undefined,
                    }))
                  }
                  placeholder={contactSection.subjectPlaceholder}
                  aria-invalid={Boolean(errors.subject)}
                  className="mt-2 w-full rounded-[1.2rem] border border-(--line) bg-white px-4 py-3 text-base text-(--ink) placeholder:text-(--muted)"
                />
                {errors.subject ? (
                  <p className="mt-2 text-sm leading-6 text-[#b42318]">{errors.subject}</p>
                ) : null}
              </label>

              <label className="mt-4 block">
                <span className="text-[0.72rem] uppercase tracking-[0.18em] text-(--muted)">
                  {contactSection.messageLabel}
                </span>
                <textarea
                  required
                  name="message"
                  rows={6}
                  value={formState.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  onBlur={(event) =>
                    setErrors((current) => ({
                      ...current,
                      message: validateField("message", event.target.value) || undefined,
                    }))
                  }
                  placeholder={contactSection.messagePlaceholder}
                  aria-invalid={Boolean(errors.message)}
                  className="mt-2 w-full rounded-[1.2rem] border border-(--line) bg-white px-4 py-3 text-base text-(--ink) placeholder:text-(--muted)"
                />
                {errors.message ? (
                  <p className="mt-2 text-sm leading-6 text-[#b42318]">{errors.message}</p>
                ) : null}
              </label>

              <label className="hidden" aria-hidden="true">
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formState.website}
                  onChange={(event) => updateField("website", event.target.value)}
                />
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary disabled:opacity-70"
                >
                  {isSubmitting ? contactSection.submittingLabel : contactSection.submitAction}
                </button>

                <p aria-live="polite" className="max-w-md text-sm leading-6 text-(--muted)">
                  {status === "success" && contactSection.successMessage}
                  {status === "error" && contactSection.errorMessage}
                  {status === "fallback" && contactSection.fallbackMessage}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
