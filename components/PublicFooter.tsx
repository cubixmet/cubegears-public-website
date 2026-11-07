import Link from "next/link";
import { Brand } from "./Brand";

const productLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing & credits" },
];
const companyLinks = [
  { href: "/for-workshops", label: "For workshops" },
  { href: "/contact", label: "Contact" },
  { href: "/signup", label: "Create an account" },
];

export function PublicFooter() {
  return (
    <footer className=" border-[#333436] bg-[#122a4f] text-white">
      <div className="page-shell grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:py-18">
        <div>
          <Brand light />
          <p className="mt-5 max-w-sm text-[15px] leading-7 text-slate-400">
            A connected workspace for car garages, bike service centres and the teams behind every service job.
          </p>
        </div>
        <nav aria-label="Product footer links">
          <h2 className="mb-4 text-sm font-bold text-white">Explore</h2>
          <div className="flex flex-col gap-3">
            {productLinks.map(({ href, label }) => <Link key={href} href={href} scroll className="footer-link focus-ring">{label}</Link>)}
          </div>
        </nav>
        <nav aria-label="Company footer links">
          <h2 className="mb-4 text-sm font-bold text-white">Get started</h2>
          <div className="flex flex-col gap-3">
            {companyLinks.map(({ href, label }) => <Link key={href} href={href} scroll className="footer-link focus-ring">{label}</Link>)}
          </div>
        </nav>
      </div>
      <div className=" border-white/10">
        <div className="page-shell flex flex-col gap-3 py-5 text-[13px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CubixGears. All rights reserved.</p>
          <p>Made for car and motorcycle service teams.</p>
        </div>
      </div>
    </footer>
  );
}
