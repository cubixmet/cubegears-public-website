"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createWorkshopAccount, SignupApiError } from "@/lib/api";

type FormState = {
  workshopName: string;
  ownerName: string;
  countryCode: string;
  mobile: string;
  email: string;
};

const initialForm: FormState = {
  workshopName: "",
  ownerName: "",
  countryCode: "+91",
  mobile: "",
  email: "",
};

const countryCodes = [
  { code: "+91", name: "India", digits: 10 },
  { code: "+971", name: "UAE", digits: 9 },
  { code: "+966", name: "Saudi Arabia", digits: 9 },
  { code: "+974", name: "Qatar", digits: 8 },
  { code: "+968", name: "Oman", digits: 8 },
  { code: "+965", name: "Kuwait", digits: 8 },
  { code: "+973", name: "Bahrain", digits: 8 },
] as const;

const fieldClass = "signup-input mt-2";
const phoneFieldClass = "signup-input min-w-0 flex-1";
const labelClass = "signup-label";

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [loading, setLoading] = useState(false);
  const selectedCountry = countryCodes.find((country) => country.code === form.countryCode) ?? countryCodes[0];

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (key === "mobile") setMobileError("");
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setError("");
    setMobileError("");

    const workshopName = form.workshopName.trim();
    const ownerName = form.ownerName.trim();
    const email = form.email.trim().toLowerCase();
    const localMobile = form.mobile.replace(/\D/g, "");
    const mobile = `${form.countryCode}${localMobile}`;
    if (workshopName.length < 2) {
      setError("Workshop name must contain at least 2 characters.");
      return;
    }
    if (ownerName.length < 2) {
      setError("Owner name must contain at least 2 characters.");
      return;
    }
    if (localMobile.length !== selectedCountry.digits || !/^\+\d{10,15}$/.test(mobile)) {
      setMobileError(`Enter a valid ${selectedCountry.digits}-digit mobile number for ${selectedCountry.name}.`);
      return;
    }
    if (!email) {
      setError("Enter your email address to receive the password setup link.");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await createWorkshopAccount({
        workshopName,
        ownerName,
        mobile,
        email,
        whatsappConsent: false,
      });
      router.push("/signup/success");
    } catch (err) {
      if (err instanceof SignupApiError && err.fieldErrors.mobile) {
        setMobileError(err.fieldErrors.mobile);
        setError("");
      } else {
        const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClass} htmlFor="workshopName">Workshop name <span className="text-red-600">*</span></label>
        <input id="workshopName" name="workshopName" className={fieldClass} placeholder="Example Auto Care" autoComplete="organization" maxLength={150} minLength={2} value={form.workshopName} onChange={(e) => setField("workshopName", e.target.value)} required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="ownerName">Owner name <span className="text-red-600">*</span></label>
          <input id="ownerName" name="ownerName" className={fieldClass} placeholder="Full name" autoComplete="name" maxLength={120} minLength={2} value={form.ownerName} onChange={(e) => setField("ownerName", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass} htmlFor="mobile">Mobile number <span className="text-red-600">*</span></label>
          <div className="mt-2 flex min-w-0 gap-2">
            <select
              id="countryCode"
              name="countryCode"
              aria-label="Country calling code"
              value={form.countryCode}
              onChange={(e) => {
                // The national number must be entered again when changing country:
                // a number from the previous country may have a different length.
                setForm((current) => ({ ...current, countryCode: e.target.value, mobile: "" }));
                setMobileError("");
                setError("");
              }}
              className="signup-input signup-country text-[13px] font-semibold"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>{country.code} {country.name}</option>
              ))}
            </select>
            <input
              id="mobile"
              name="mobile"
              className={phoneFieldClass + (mobileError ? " !border-red-500 focus:!border-red-600" : "")}
              aria-invalid={Boolean(mobileError)}
              aria-describedby={mobileError ? "signup-mobile-error" : undefined}
              placeholder={`${selectedCountry.digits}-digit number`}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={selectedCountry.digits}
              pattern={`[0-9]{${selectedCountry.digits}}`}
              value={form.mobile}
              onChange={(e) => setField("mobile", e.target.value.replace(/\D/g, "").slice(0, selectedCountry.digits))}
              required
            />
          </div>
          {mobileError ? (
            <p id="signup-mobile-error" role="alert" className="mt-2 text-[12px] font-medium leading-relaxed text-red-600">
              {mobileError}
            </p>
          ) : null}
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="email">Email address <span className="text-red-600">*</span></label>
        <input id="email" name="email" className={fieldClass} placeholder="owner@workshop.com" type="email" autoComplete="email" maxLength={254} value={form.email} onChange={(e) => setField("email", e.target.value)} required />
      </div>
      {error ? <div id="signup-error" role="alert" aria-live="assertive" className="signup-error">{error}</div> : null}
      <button type="submit" disabled={loading} aria-describedby={error ? "signup-error" : undefined} className="button-primary focus-ring flex w-full !text-[16px] disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? "Creating your workshop…" : "Create workshop account"}
      </button>
    </form>
  );
}
