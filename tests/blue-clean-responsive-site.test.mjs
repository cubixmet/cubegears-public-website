import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");
const css = read("app/globals.css");
const signup = read("app/signup/page.tsx");
const form = read("app/signup/signup-form.tsx");
const header = read("components/PublicHeader.tsx");

const themedFiles = [
  "app/page.tsx", "app/features/page.tsx", "app/how-it-works/page.tsx",
  "app/for-workshops/page.tsx", "app/pricing/page.tsx", "app/contact/page.tsx",
  "app/signup/page.tsx", "app/signup/success/page.tsx", "app/not-found.tsx",
  "components/Brand.tsx", "components/PublicHeader.tsx",
];

test("blue brand replaces red accents across the public site", () => {
  assert.match(css, /--brand:\s*#2563eb/);
  assert.match(css, /--brand-dark:\s*#1748b3/);
  for (const filename of themedFiles) {
    const source = read(filename);
    assert.doesNotMatch(source, /(?:bg|text|border)-(?:red|rose|pink)-\d+/, filename + " still uses red UI theme");
    assert.doesNotMatch(source, /#(?:ce1b2a|c51b29|b51625|b81725|c61929|bd1725)/i,
      filename + " still uses a previous red brand color");
  }
});

test("headings, nav links, and CTA cards have no decorative line accents", () => {
  assert.doesNotMatch(css, /\.site-nav-link-active::after\s*\{/);
  assert.match(css, /\.eyebrow::before\s*\{\s*display:\s*none/);
  assert.match(css, /\.marketing-cta::before\s*\{\s*display:\s*none/);
  assert.match(css, /\.premium-rule\s*\{\s*display:\s*none/);
  assert.match(css, /\.surface-card,\s*\.marketing-card,\s*\.signup-card\s*\{\s*border:\s*0/);
  for (const filename of themedFiles) {
    const source = read(filename);
    assert.doesNotMatch(source, /(?:sm:|md:|lg:|xl:)?border-(?:t|b|y)(?=[\s"'])/, filename + " has a decorative divider");
    assert.doesNotMatch(source, /<span className="h-px/, filename + " has a decorative horizontal line");
  }
  assert.match(css, /\.signup-input\s*\{[\s\S]*?border:\s*1px solid/);
  assert.match(css, /focus-visible/);
});

test("signup page is mobile-first without a promotional photo container", () => {
  assert.match(signup, /<SignupForm\s*\/>/);
  assert.match(signup, /max-w-\[830px\]/);
  assert.doesNotMatch(signup, /WorkshopPhoto|signup-story|signup-grid|<Image|<img/i);
  assert.match(signup, /Already have a workshop account\?/);
  assert.match(signup, /Sign in/);
  assert.match(form, /maxLength=\{selectedCountry\.digits\}/);
  assert.match(form, /createWorkshopAccount\(\{/);
  assert.match(css, /@media \(max-width:\s*640px\)/);
  assert.match(css, /\.signup-card\s*\{\s*padding:\s*24px 18px/);
  assert.match(header, /xl:hidden/);
  assert.match(header, /aria-expanded=\{menuOpen\}/);
  assert.match(read("app/page.tsx"), /grid-cols-1/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
