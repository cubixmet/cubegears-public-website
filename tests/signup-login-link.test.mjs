import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const signup = readFileSync(new URL("../app/signup/page.tsx", import.meta.url), "utf8");
const form = readFileSync(new URL("../app/signup/signup-form.tsx", import.meta.url), "utf8");

test("signup displays a compact sign-in link under the registration form", () => {
  assert.match(signup, /Already have a workshop account\?/);
  assert.match(signup, /href="https:\/\/cubegears-company-panel-three\.vercel\.app\/login"/);
  assert.match(signup, /Sign in\s*<\/a>/);
  assert.ok(signup.indexOf("Already have a workshop account?") > signup.indexOf("<SignupForm />"));
  assert.doesNotMatch(signup, /bg-blue-50\/70 px-4 py-3/);
  assert.doesNotMatch(signup, /→/);
  assert.match(signup, /Learn how it works/);
});

test("signup form and registration submission are retained", () => {
  assert.match(signup, /<SignupForm \/>/);
  assert.match(form, /await createWorkshopAccount\(/);
  assert.match(form, /router\.push\("\/signup\/success"\)/);
});
