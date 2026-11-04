import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import SignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "Create Workshop Account",
  description: "Set up your workshop and owner account in CubeGears.",
  robots: { index: false, follow: false },
};

const benefits = [
  "Customers, vehicles and service history in one place",
  "Job cards from check-in to delivery",
  "Connected stock, estimates and invoices",
  "Access roles for your workshop team",
];

export default function SignupPage() {
  return (
    <>
      <PublicHeader />
      <main id="main-content" className="min-h-[calc(100svh-76px)] bg-[#f4f7fc]">
        <section className="page-shell grid items-start gap-6 py-8 sm:py-14 lg:grid-cols-[.86fr_1.14fr] lg:gap-10">
          <aside className="marketing-hero-dark relative overflow-hidden rounded-[24px] p-7 text-white sm:p-10 lg:sticky lg:top-24">
            <div className="pointer-events-none absolute -right-20 -top-12 h-60 w-60 rounded-full bg-blue-500/25 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <p className="eyebrow !text-blue-300">YOUR NEW WORKSPACE</p>
              <h1 className="marketing-text-balance mt-6 text-[clamp(33px,4vw,49px)] font-extrabold leading-[1.1] tracking-[-.055em]">Build a better organised workshop.</h1>
              <p className="mt-5 text-[16px] leading-8 text-slate-300">Create a workspace for your workshop and bring daily operations together.</p>
              <ul className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-[14px] leading-6 text-slate-200 sm:text-[15px]">
                    <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white">✓</span>{benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-9 border-t border-white/15 pt-6">
                <p className="text-[12px] font-bold tracking-[.12em] text-blue-200">WHAT HAPPENS NEXT</p>
                <p className="mt-2 text-[14px] leading-7 text-slate-300">After a successful registration, check your email for the secure password setup link.</p>
                <Link href="/how-it-works" className="focus-ring mt-4 inline-flex items-center gap-2 rounded-lg py-2 text-[14px] font-bold text-white underline decoration-blue-300 underline-offset-4 hover:text-blue-200">Learn how it works <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </aside>

          <div className="marketing-card min-w-0 p-6 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">WORKSHOP SIGN UP</p>
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[12px] font-bold text-blue-700">Step 1 · Workshop details</span>
            </div>
            <h2 className="mt-5 text-[30px] font-extrabold tracking-[-.045em] text-slate-950 sm:text-[36px]">Create your account</h2>
            <p className="mt-3 text-[15px] leading-7 text-slate-600">Enter your workshop and owner contact details to begin registration. A password setup link is sent after successful registration.</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3">
              <p className="text-[14px] font-medium text-slate-700">Already have a workshop account?</p>
              <a
                href="https://cubegears-company-panel-three.vercel.app/login"
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-blue-600 bg-white px-5 text-[15px] font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white"
              >
                Log in <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="my-8 h-px bg-slate-100" />
            <SignupForm />
            <p className="mt-6 border-t border-slate-100 pt-5 text-[13px] leading-6 text-slate-500">Your details are used to create your workshop account. Never share your password through a signup request.</p>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
