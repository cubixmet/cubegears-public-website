import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("development signup defaults to local Django; production requires an explicit backend", () => {
  const route = read("app/api/signup/route.ts");
  const env = read(".env.example");
  assert.match(route, /process\.env\.NODE_ENV === "production"/);
  assert.match(route, /http:\/\/127\.0\.0\.1:8000\/api\/v1/);
  assert.match(route, /SIGNUP_BACKEND_NOT_CONFIGURED/);
  assert.match(env, /BACKEND_API_URL=http:\/\/127\.0\.0\.1:8000\/api\/v1/);
  assert.doesNotMatch(env, /cardflow\.pythonanywhere\.com/);
});

test("network errors are diagnostic and signup POST is not retried", () => {
  const route = read("app/api/signup/route.ts");
  assert.match(route, /SIGNUP_BACKEND_UNREACHABLE/);
  assert.match(route, /SIGNUP_BACKEND_TIMEOUT/);
  assert.match(route, /Registration confirmation timed out/);
  assert.match(route, /Your workshop may already be created/);
  assert.match(route, /AbortSignal\.timeout\(25000\)/);
  assert.match(route, /reason: timedOut \? "timeout" : "network"/);
  assert.match(route, /status: timedOut \? 504 : 502/);
  assert.match(route, /Never log signup fields, tokens/);
  assert.match(route, /Do not retry a POST/);
});
