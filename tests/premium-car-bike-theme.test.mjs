import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const css = read("app/globals.css");
const photos = read("components/WorkshopPhoto.tsx");
const home = read("app/page.tsx");
const signup = read("app/signup/page.tsx");
const form = read("app/signup/signup-form.tsx");

test("premium car-bike theme applies consistently across all public routes", () => {
  assert.match(css, /--brand:\s*#2563eb/);
  assert.match(css, /site-mobile-panel/);
  assert.match(css, /max-height:\s*calc\(100dvh\s*-\s*76px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /animation:\s*premium-enter/);
  for (const path of [
    "app/page.tsx",
    "app/features/page.tsx",
    "app/how-it-works/page.tsx",
    "app/for-workshops/page.tsx",
    "app/pricing/page.tsx",
    "app/contact/page.tsx",
    "app/signup/page.tsx",
    "app/signup/success/page.tsx",
  ]) {
    const page = read(path);
    assert.match(page, /<PublicHeader\s*\/>/, "Header missing from " + path);
    assert.match(page, /<PublicFooter\s*\/>/, "Footer missing from " + path);
  }
});

test("real automotive and motorcycle photos are provided with descriptions", () => {
  assert.match(photos, /\/images\/bike-repair\.webp/);
  assert.match(photos, /\/images\/bike-team\.webp/);
  assert.match(photos, /\/images\/car-service\.webp/);
  assert.doesNotMatch(photos, /images\.pexels\.com|https:\/\//);
  assert.doesNotMatch(css, /images\.pexels\.com/);
  for (const image of [
    "car-workshop", "car-service", "car-team", "car-engine", "car-inspection",
    "garage-interior", "bike-repair", "bike-team", "bike-service",
  ]) {
    const stat = statSync(new URL("../public/images/" + image + ".webp", import.meta.url));
    assert.ok(stat.size > 12_000, "Missing or invalid bundled image: " + image);
  }
  assert.match(photos, /alt=\{asset\.alt\}/);
  assert.match(home, /photo="bike"/);
  assert.match(home, /photo="bikeTeam"/);
  assert.match(home, /photo="garage"/);
  assert.match(read("app/for-workshops/page.tsx"), /Motorcycle & scooter service/);
});

test("signup has a compact image-free form and retains validated registration", () => {
  assert.match(signup, /signup-card/);
  assert.doesNotMatch(signup, /WorkshopPhoto|signup-grid|signup-story|<Image|<img/i);
  assert.match(signup, /<SignupForm\s*\/>/);
  assert.match(signup, /Already have a workshop account\?/);
  assert.match(form, /createWorkshopAccount\(\{/);
  assert.match(form, /maxLength=\{selectedCountry\.digits\}/);
  assert.match(form, /selectedCountry\.digits/);
  assert.match(form, /whatsappConsent:\s*false/);
  assert.match(form, /router\.push\("\/signup\/success"\)/);
});
