import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const route = read("app/api/signup/route.ts");
const form = read("app/signup/signup-form.tsx");
const client = read("lib/api.ts");

test("signup proxies only POST and retains backend URL config", () => {
  assert.match(route, /export async function POST\(request: Request\)/);
  assert.match(route, /process\.env\.BACKEND_API_URL/);
  assert.match(route, /process\.env\.BACKEND_SIGNUP_PATH/);
  assert.match(route, /"\/auth\/signup"/);
  assert.match(route, /cache: "no-store"/);
  assert.match(route, /signal: AbortSignal\.timeout\(25000\)/);
});

test("submit normalizes contact details and API proxy repeats safe normalization", () => {
  assert.match(form, /const localMobile = form\.mobile\.replace/);
  assert.ok(form.includes("const mobile = `${form.countryCode}${localMobile}`;"));
  assert.match(form, /const email = form\.email\.trim\(\)\.toLowerCase\(\)/);
  assert.match(form, /workshopName\.length < 2/);
  assert.match(form, /ownerName\.length < 2/);
  assert.match(route, /mobile: payload\.mobile\.replace\(\/\[\\s\(\)-\]\/g, ""\)/);
  assert.ok(route.includes('email: (payload.email || "").trim().toLowerCase(),'));
  assert.ok(route.includes('whatsapp_consent: payload.whatsappConsent === true,'));
  assert.doesNotMatch(route, /mobile: payload\.mobile\.trim\(\)/);
});

test("non-JSON HTML 400 cannot masquerade as a form validation response", () => {
  assert.match(route, /contentType\.toLowerCase\(\)\.includes\("json"\)/);
  assert.match(route, /SIGNUP_UPSTREAM_NON_JSON/);
  assert.match(route, /status: response\.status/);
  assert.match(route, /status: 502/);
  assert.match(route, /Do not log names, emails, phone numbers, tokens or upstream HTML/);
  assert.doesNotMatch(route, /await response\.json\(\)\.catch\(\(\) => \(\{ message: "Unable to process registration\." \}\)\)/);
});

test("Django 400 email and other field errors are shown in context", () => {
  assert.match(client, /const names: Record<string, string>/);
  assert.match(client, /email: "Email address"/);
  assert.match(client, /mobile: "Mobile number"/);
  assert.match(client, /owner_name: "Owner name"/);
  assert.match(client, /workshop_name: "Workshop name"/);
  assert.match(client, /throw new Error\(getApiErrorMessage\(data, response\.status\)\)/);
  assert.match(route, /return NextResponse\.json\(data, \{ status: response\.status \}\)/);
  assert.match(form, /router\.push\("\/signup\/success"\)/);
});


test("owner signup uses email without WhatsApp choice or consent rows", () => {
  assert.match(route, /email\?: string/);
  assert.match(route, /whatsappConsent\?: boolean/);
  assert.match(route, /Boolean\(email \|\| whatsappConsent\)/);
  assert.match(route, /whatsapp_consent: payload\.whatsappConsent === true/);
  assert.match(form, /if \(!email\)/);
  assert.match(form, /whatsappConsent: false/);
  assert.match(form, /htmlFor="email"/);
  assert.doesNotMatch(form, /setupChannel|Receive setup link on WhatsApp|type="checkbox"/);
  assert.doesNotMatch(form, /I confirm I am authorised|I consent to receive the secure password/);
  assert.match(client, /whatsappConsent: boolean/);
});
