import Link from "next/link";

export function Brand({ light = false, onNavigate }: { light?: boolean; onNavigate?: () => void }) {
  return (
    <Link href="/" onClick={onNavigate} aria-label="cubixgear — Home" className="brand-link focus-ring">
      <span className={light ? "brand-name text-white" : "brand-name text-[#17283d]"}>
        cubix<span className="text-[#2563eb]">gear</span>
        <span className="brand-descriptor">WORKSHOP SOFTWARE</span>
      </span>
    </Link>
  );
}
