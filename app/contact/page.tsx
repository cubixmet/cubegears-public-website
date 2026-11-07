import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { PageHero, SectionLead } from "@/components/MarketingBlocks";

export const metadata: Metadata = {
  title: "Contact & Onboarding",
  description: "Find the right path to get started with CubixGears or learn more about workshop management.",
};

const topics = [
  { number: "01", title: "Explore the software", description: "See how customers, vehicles, job cards, stock and invoices fit together.", href: "/features", label: "Browse features" },
  { number: "02", title: "Understand the workflow", description: "Follow a service visit from the initial check-in through final delivery.", href: "/how-it-works", label: "See the workflow" },
  { number: "03", title: "Review credit billing", description: "Learn how core tools, optional modules and configurable usage rules work.", href: "/pricing", label: "Explore pricing" },
];

export default function ContactPage() {
  const contactEmail = process.env.CONTACT_EMAIL?.trim();

  return (
    <>
      <PublicHeader />
      <main id="main-content" className="bg-[#f5f8ff]">
        <PageHero eyebrow="GET STARTED WITH CUBEGEARS" title="Let's get your workshop moving" description="Run a car garage or a two-wheeler service centre? Discover the next step for your team." image="bikeTeam">
          <div className="responsive-actions">
            <Link href="/signup" className="button-primary focus-ring inline-flex">Create workshop account</Link>
            {contactEmail ? (
              <a href={"mailto:" + contactEmail} className="button-secondary focus-ring">Email our team</a>
            ) : (
              <Link href="/how-it-works" className="button-secondary focus-ring">See how it works</Link>
            )}
          </div>
          {contactEmail ? <p className="mt-4 break-all text-[14px] font-semibold text-slate-600">Email: <a className="focus-ring underline decoration-blue-300 underline-offset-4 hover:text-[#245bd5]" href={"mailto:" + contactEmail}>{contactEmail}</a></p> : null}
        </PageHero>

        <section className="section-pad">
          <div className="page-shell">
            <SectionLead eyebrow="HERE'S HOW TO BEGIN" title="Choose your next step" description="Find product details and onboarding information without waiting for a sales call." />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {topics.map((topic) => (
                <article key={topic.number} className="marketing-card surface-card-hover flex flex-col p-6 sm:p-8">
                  <span className="marketing-number" aria-hidden="true">{topic.number}</span>
                  <h3 className="mt-7 text-[22px] font-extrabold tracking-[-.035em] text-[#17283d]">{topic.title}</h3>
                  <p className="mt-4 flex-1 text-[15px] leading-7 text-slate-600">{topic.description}</p>
                  <Link href={topic.href} className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-lg py-2 text-[14px] font-extrabold text-[#245bd5] hover:text-[#174399]">{topic.label}</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className=" border-[#e8effa] bg-white py-14 sm:py-18">
          <div className="page-shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionLead eyebrow="ACCOUNT ONBOARDING" title="What happens when you sign up?" description="Start with your workshop details and the owner's contact information. Registration is connected to the CubixGears account setup service." />
              <Link href="/signup" className="button-primary focus-ring mt-7 inline-flex">Start registration</Link>
            </div>
            <ol className="marketing-card space-y-0 p-6 sm:p-8">
              {[
                ["01", "Enter workshop details", "Provide the workshop name and owner's contact details."],
                ["02", "Submit registration", "Your details are sent securely to the registration service."],
                ["03", "Set up access", "Follow the secure password setup email once registration succeeds."],
              ].map(([number, title, description], index) => (
                <li key={number} className={"flex items-start gap-4 " + (index < 2 ? "mb-5 border-[#edf2fa] pb-5" : "")}>
                  <span className="marketing-number" aria-hidden="true">{number}</span>
                  <div><h3 className="text-[16px] font-extrabold text-slate-900">{title}</h3><p className="mt-1 text-[14px] leading-7 text-slate-600">{description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
