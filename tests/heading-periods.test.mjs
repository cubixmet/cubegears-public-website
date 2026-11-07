import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pages = [
  "app/page.tsx", "app/features/page.tsx", "app/how-it-works/page.tsx",
  "app/for-workshops/page.tsx", "app/pricing/page.tsx", "app/contact/page.tsx",
  "app/signup/page.tsx", "app/signup/success/page.tsx", "app/not-found.tsx",
];
const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("heading titles and inline headings do not end with a period", () => {
  for (const page of pages) {
    const src = read(page);
    assert.doesNotMatch(src, /\btitle="[^"]+\."(?=\s|>)/,
      "Heading title prop has trailing dot in " + page);
    assert.doesNotMatch(src, /<h[1-6]\b[^>]*>[^<]*\.<\/h[1-6]>/,
      "Inline heading has trailing dot in " + page);
  }
});

test("signup title is clean and registration form functionality is retained", () => {
  assert.match(read("app/signup/page.tsx"), />Create your workshop account<\/h1>/);
  assert.match(read("app/signup/page.tsx"), /<SignupForm\s*\/>/);
  assert.match(read("app/signup/signup-form.tsx"), /createWorkshopAccount\(\{/);
  assert.match(read("app/signup/signup-form.tsx"), /maxLength=\{selectedCountry\.digits\}/);
  assert.doesNotMatch(read("app/page.tsx"), /One clear system\.<\/span>/);
});
