import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import SignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "Create Workshop Account | CubixGears",
  description: "Register your car garage, bike workshop or automotive service centre and create your CubixGears workspace.",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <>
      <PublicHeader />
      <main id="main-content" className="signup-stage min-h-[calc(100svh-76px)]">
        <section className="page-shell mx-auto max-w-[830px] py-6 sm:py-12 lg:py-16">
          <div className="signup-card min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">WORKSHOP SIGN UP</p>
              <span className="rounded-lg bg-[#eaf2ff] px-3 py-1.5 text-[11px] font-extrabold text-[#245bd5]">STEP 01 · WORKSHOP DETAILS</span>
            </div>
            <h1 className="mt-5 text-[clamp(31px,4vw,46px)] font-extrabold leading-[1.12] tracking-[-.055em] text-[#10233f]">Create your workshop account.</h1>
            <p className="mt-4 max-w-[590px] text-[15px] leading-7 text-[#586a80]">
              Start your CubixGears workspace for car and motorcycle service. Enter your workshop and owner details to receive a secure password setup link by email.
            </p>

            <div className="mt-8">
              <SignupForm />
            </div>

            <p className="mt-6 text-center text-[14px] leading-7 text-[#586a80]">
              Already have a workshop account?{" "}
              <a href="https://cubegears-company-panel-three.vercel.app/login" className="focus-ring inline-flex min-h-11 items-center font-extrabold text-[#245bd5] hover:underline">Sign in</a>
            </p>
            <p className="mt-2 text-center text-[12px] leading-6 text-[#78869a]">
              After registration, complete your password setup from the secure email link.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-[13px] text-[#65758b]">
            <Link href="/features" className="font-bold text-[#245bd5] hover:underline">Explore platform features</Link>
            <Link href="/how-it-works" className="font-bold text-[#245bd5] hover:underline">Learn how it works</Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
