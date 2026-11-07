"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./Brand";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-workshops", label: "Workshops" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

export function PublicHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Lock the background while the menu is open. Escape closes it; desktop
  // resizing also closes it to avoid leaving the page locked.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
    };
    const onPopState = () => setMenuOpen(false);

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("popstate", onPopState);
    firstLinkRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("popstate", onPopState);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const current = (href: string) => pathname === href;

  return (
    <header className="site-header">
      <div className="page-shell flex h-[76px] items-center justify-between gap-3 lg:gap-5">
        <div className="shrink-0">
          <Brand onNavigate={closeMenu} />
        </div>

        <nav aria-label="Primary navigation" className="hidden min-w-0 items-center justify-center gap-0.5 xl:flex">
          {navigation.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              scroll
              aria-current={current(href) ? "page" : undefined}
              className={"site-nav-link focus-ring " + (current(href) ? "site-nav-link-active" : "")}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/signup"
            scroll
            aria-current={pathname === "/signup" ? "page" : undefined}
            className="button-primary focus-ring hidden sm:inline-flex"
          >
            Get started
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#252729] transition hover:bg-blue-50 xl:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg aria-hidden="true" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg aria-hidden="true" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-x-0 top-[76px] z-40 h-[calc(100dvh-76px)] bg-slate-950/35 backdrop-blur-[2px] xl:hidden"
          onClick={closeMenu}
        />
      )}

      <div id="mobile-navigation" className={menuOpen ? "site-mobile-panel xl:hidden" : "hidden"}>
        <nav aria-label="Mobile navigation" className="page-shell flex flex-col gap-1 py-4">
          {navigation.map(({ href, label }, index) => (
            <Link
              key={href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={href}
              scroll
              aria-current={current(href) ? "page" : undefined}
              onClick={closeMenu}
              className={"focus-ring flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-[16px] font-semibold transition " +
                (current(href) ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50")}
            >
              <span>{label}</span>
              {current(href) ? <span className="text-xs font-extrabold text-[#245bd5]">Current</span> : null}
            </Link>
          ))}
          <Link
            href="/signup"
            scroll
            onClick={closeMenu}
            aria-current={pathname === "/signup" ? "page" : undefined}
            className="button-primary focus-ring mt-3 inline-flex w-full justify-center sm:hidden"
          >
            Create workshop account
          </Link>
        </nav>
      </div>
    </header>
  );
}
