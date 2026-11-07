import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";

export default function NotFound() {
  return (
    <>
      <PublicHeader />
      <main id="main-content" className="page-shell grid min-h-[65vh] place-items-center py-16 text-center">
        <div className="max-w-2xl">
          <span aria-hidden="true" className="text-[clamp(86px,14vw,160px)] font-black leading-none tracking-[-.09em] text-blue-100">404</span>
          <p className="eyebrow mt-4 justify-center">PAGE NOT FOUND</p>
          <h1 className="marketing-text-balance mt-5 text-[clamp(34px,5vw,56px)] font-extrabold leading-[1.1] tracking-[-.055em] text-[#17283d]">Looks like this page took a wrong turn</h1>
          <p className="section-copy mx-auto mt-5 max-w-lg">This link may have moved. You can go back home or explore the CubixGears features.</p>
          <div className="responsive-actions mt-8 justify-center">
            <Link href="/" className="button-primary focus-ring inline-flex">Back to home</Link>
            <Link href="/features" className="button-secondary focus-ring">Explore features</Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
