import { NextResponse } from "next/server";

type SignupRequest = {
  workshopName: string;
  ownerName: string;
  mobile: string;
  email?: string;
  whatsappConsent?: boolean;
};

function getBackendUrl(): string | null {
  // Local development should work with Django on port 8000 even before
  // .env.local is created. Never use localhost as a production fallback:
  // a deployed Next.js server cannot reach the developer's laptop.
  const configuredUrl = process.env.BACKEND_API_URL?.trim();
  const baseUrl = (configuredUrl || (
    process.env.NODE_ENV === "production" ? "" : "http://127.0.0.1:8000/api/v1"
  )).replace(/\/+$/, "");
  const endpoint = (process.env.BACKEND_SIGNUP_PATH || "/auth/signup").trim();
  if (!baseUrl) return null;

  try {
    const url = new URL(baseUrl + (endpoint.startsWith("/") ? endpoint : "/" + endpoint));
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

function isValidPayload(value: unknown): value is SignupRequest {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const p = value as Record<string, unknown>;
  const email = typeof p.email === "string" ? p.email.trim() : "";
  const whatsappConsent = p.whatsappConsent === true;
  return (
    typeof p.workshopName === "string" && p.workshopName.trim().length >= 2 && p.workshopName.length <= 150 &&
    typeof p.ownerName === "string" && p.ownerName.trim().length >= 2 && p.ownerName.length <= 120 &&
    typeof p.mobile === "string" && /^\+?\d{10,15}$/.test(p.mobile.replace(/[\s()-]/g, "")) &&
    (p.email === undefined || (typeof p.email === "string" && p.email.length <= 254)) &&
    (!email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) &&
    (p.whatsappConsent === undefined || typeof p.whatsappConsent === "boolean") &&
    Boolean(email || whatsappConsent)
  );
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ message: "Send a JSON signup request." }, { status: 415 });
  }

  const bodyLength = Number(request.headers.get("content-length") || 0);
  if (bodyLength > 8192) {
    return NextResponse.json({ message: "Signup request is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid signup request." }, { status: 400 });
  }
  if (!isValidPayload(payload)) {
    return NextResponse.json({ message: "Please enter valid workshop and owner contact details." }, { status: 400 });
  }

  const backendUrl = getBackendUrl();
  if (!backendUrl) {
    console.error("[public-signup] Backend endpoint is not configured");
    return NextResponse.json(
      {
        message: "Registration is temporarily unavailable. Please contact support.",
        code: "SIGNUP_BACKEND_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  const backendPayload = {
    workshop_name: payload.workshopName.trim(),
    owner_name: payload.ownerName.trim(),
    mobile: payload.mobile.replace(/[\s()-]/g, ""),
    email: (payload.email || "").trim().toLowerCase(),
    whatsapp_consent: payload.whatsappConsent === true,
  };

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(backendPayload),
      cache: "no-store",
      // Allow Django to finish its DB commit and setup-email dispatch.
      // A premature timeout can hide a successfully created workshop.
      signal: AbortSignal.timeout(25000),
    });

    // Django/DRF validation errors are JSON. An HTML 400 often indicates an
    // upstream host/proxy configuration problem; don't disguise it as a
    // workshop form error or send backend HTML to the browser.
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("json")) {
      // Do not log names, emails, phone numbers, tokens or upstream HTML.
      console.error("[public-signup] Non-JSON backend response", {
        status: response.status,
        contentType: contentType.split(";")[0],
      });
      return NextResponse.json(
        {
          message: `Registration service returned an unexpected response (HTTP ${response.status}). Please contact support.`,
          code: "SIGNUP_UPSTREAM_NON_JSON",
        },
        { status: 502 },
      );
    }
    const data: unknown = await response.json().catch(() => null);
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json(
        { message: "The registration service returned an invalid response. Please contact support." },
        { status: 502 },
      );
    }
    if (response.ok) return NextResponse.json(data, { status: response.status });
    // Expose real Django field validation, including duplicate emails, but
    // never leak internal errors or unrelated upstream payloads.
    if (response.status >= 500) {
      return NextResponse.json({ message: "Registration is temporarily unavailable." }, { status: 502 });
    }
    // Log only validation field names and an opaque request reference.
    // Never log workshop data, email/mobile values, or setup secrets.
    if (response.status === 400) {
      console.warn("[public-signup] Backend rejected registration", {
        status: response.status,
        fields: Object.keys(data),
        requestId: response.headers.get("x-request-id") || undefined,
      });
    }
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    // Log only connection metadata. Never log signup fields, tokens or
    // upstream response bodies. Do not retry a POST: it may create duplicates.
    const timedOut = error instanceof Error &&
      (error.name === "TimeoutError" || error.name === "AbortError");
    console.error("[public-signup] Backend connection failed", {
      host: new URL(backendUrl).host,
      reason: timedOut ? "timeout" : "network",
    });
    return NextResponse.json(
      {
        message: timedOut
          ? "Registration confirmation timed out. Your workshop may already be created. Check your email before submitting again; contact support if you cannot access your account."
          : process.env.NODE_ENV !== "production"
            ? "CubixGears Django backend is unreachable. Start it on port 8000 or correct BACKEND_API_URL in .env.local."
            : "Unable to reach the CubixGears registration service. Please contact support.",
        code: timedOut ? "SIGNUP_BACKEND_TIMEOUT" : "SIGNUP_BACKEND_UNREACHABLE",
      },
      { status: timedOut ? 504 : 502 },
    );
  }
}
