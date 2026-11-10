"use client";

import Link from "next/link";
import Image from "next/image";

export function Brand({ light = false, onNavigate }: { light?: boolean; onNavigate?: () => void }) {
  return (
    <Link href="/" onClick={onNavigate} aria-label="cubixgear — Home" className="brand-link focus-ring">
      <Image
        src="/logo/logo.png"
        alt=""
        className="brand-image"
        width={44}
        height={44}
        priority
        unoptimized
        onError={(event) => {
          // Brand text remains usable while a local-only logo is being deployed.
          event.currentTarget.style.display = "none";
        }}
      />
      <span className={light ? "brand-name text-white" : "brand-name text-[#17283d]"}>
        cubix<span className="text-[#2563eb]">gear</span>
        <span className="brand-descriptor">WORKSHOP SOFTWARE</span>
      </span>
    </Link>
  );
}
