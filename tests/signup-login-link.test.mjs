import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const signup = readFileSync(new URL("../app/signup/page.tsx", import.meta.url), "utf8");
const form = readFileSync(new URL("../app/signup/signup-form.tsx", import.meta.url), "utf8");

test("signup has a clearly labeled login link to the real Company Panel", () => {
  assert.match(signup, /Already have a workshop account\?/);
  assert.match(signup, /href="https:\/\/cubegears-company-panel-three\.vercel\.app\/login"/);
  assert.match(signup, />\s*Log in\s*<span aria-hidden="true">/);
  assert.match(signup, /focus-ring inline-flex min-h-11/);
});

test("signup form and registration submission are retained", () => {
  assert.match(signup, /<SignupForm \/>/);
  assert.match(form, /await createWorkshopAccount\(/);
  assert.match(form, /router\.push\("\/signup\/success"\)/);
});
