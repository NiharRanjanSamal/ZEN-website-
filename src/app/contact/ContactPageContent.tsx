"use client";

import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { useContent } from "@/components/LocaleProvider";

export function ContactPageContent() {
  const { contactPeople, site, pages } = useContent();
  const copy = pages.contact;
  const form = copy.form;

  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        lead={`${copy.heroLeadPrefix} ${site.location}. ${copy.heroLeadSuffix}`}
        imageSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2200&q=80"
        imageAlt={copy.heroImageAlt}
      />

      <section className="page-split py-16 md:py-24">
        <div className="container-zen grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="eyebrow">{copy.leadershipEyebrow}</p>
            <h2 className="section-title mt-2">{copy.leadershipTitle}</h2>
            <p className="section-lead mt-3">{copy.leadershipLead}</p>

            <ul className="contact-directory">
              {contactPeople.map((person, index) => (
                <li key={person.email}>
                  <span className="contact-directory-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="contact-directory-name">{person.name}</p>
                    <p className="contact-directory-meta">
                      <a href={`mailto:${person.email}`}>{person.email}</a>
                      <span aria-hidden>·</span>
                      <a href={`tel:${person.phone.replace(/\s+/g, "")}`}>{person.phone}</a>
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-[var(--line)] pt-4">
              <p className="text-sm text-steel-500">{site.dpiitFull}</p>
              <p className="mt-1 text-sm text-steel-500">{site.location}</p>
            </div>
          </div>

          <div>
            <div className="relative mb-6 aspect-[16/9] overflow-hidden bg-steel-900">
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80"
                alt="Business discussion representing a Zenuino engagement conversation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-steel-950/65 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-2xl text-steel-50">{copy.formImageTitle}</p>
              </div>
            </div>

            <form
              className="grid gap-5 border border-[var(--line)] bg-surface/95 p-5 md:p-8"
              action={`mailto:${site.email}`}
              method="post"
              encType="text/plain"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div className="form-field">
                  <label htmlFor="name">{form.name}</label>
                  <input id="name" name="name" required autoComplete="name" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">{form.email}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="company">{form.company}</label>
                <input id="company" name="company" autoComplete="organization" />
              </div>
              <div className="form-field">
                <label htmlFor="message">{form.message}</label>
                <textarea id="message" name="message" rows={5} required />
              </div>
              <button type="submit" className="btn btn-primary justify-self-start">
                {form.submit}
              </button>
              <p className="text-sm text-steel-500">{copy.formNote}</p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
