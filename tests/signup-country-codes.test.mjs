import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const form = readFileSync(new URL("../app/signup/signup-form.tsx", import.meta.url), "utf8");

test("signup offers India and GCC country codes beside the local number", () => {
  for (const code of ["+91", "+971", "+966", "+974", "+968", "+965", "+973"]) {
    assert.ok(form.includes('code: "' + code + '"'), "Missing country code: " + code);
  }
  assert.match(form, /name="countryCode"/);
  assert.match(form, /autoComplete="tel-national"/);
  assert.doesNotMatch(form, /mobile-help|Enter the .*number without the country code/);
  assert.match(form, /value=\{form\.mobile\}/);
});

test("signup sends an international mobile number to the existing API", () => {
  assert.ok(form.includes("const mobile = \`\${form.countryCode}\${localMobile}\`;"));
  assert.match(form, /localMobile\.length !== selectedCountry\.digits/);
  assert.match(form, /await createWorkshopAccount\(\{/);
  assert.match(form, /\s+mobile,\s*/);
});

test("mobile input enforces the selected country's digit limit while typing and pasting", () => {
  assert.match(form, /maxLength=\{selectedCountry\.digits\}/);
  assert.ok(form.includes('pattern={`[0-9]{${selectedCountry.digits}}`}'));
  assert.match(form, /\.replace\(\/\\D\/g, ""\)\.slice\(0, selectedCountry\.digits\)/);
  assert.ok(form.includes('placeholder={`${selectedCountry.digits}-digit number`}'));
  assert.match(form, /countryCode: e\.target\.value, mobile: ""/);
  assert.doesNotMatch(form, /maxLength=\{15\}|mobile-help/);
});
