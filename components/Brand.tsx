import Link from "next/link";

export function Brand({ light = false, onNavigate }: { light?: boolean; onNavigate?: () => void }) {
  return (
    <Link href="/" onClick={onNavigate} aria-label="CubixGears — Home" className="brand-link focus-ring">
      <span className={light ? "brand-name text-white" : "brand-name text-[#17283d]"}>
        Cubix<span className="text-[#2563eb]">Gears</span>
        <span className="brand-descriptor">WORKSHOP SOFTWARE</span>
      </span>
    </Link>
  );
}
