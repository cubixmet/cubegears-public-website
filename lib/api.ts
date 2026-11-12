export type WorkshopSignupPayload = {
  workshopName: string;
  ownerName: string;
  mobile: string;
  email: string;
  whatsappConsent: boolean;
};

type SignupResponse = {
  message?: string;
  workshop?: unknown;
  user?: unknown;
  [key: string]: unknown;
};

function getApiErrorMessage(data: unknown, status: number): string {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return `Registration failed (HTTP ${status}). Please try again or contact support.`;
  }
  const fields = data as Record<string, unknown>;
  const getText = (value: unknown): string | null => {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (Array.isArray(value) && typeof value[0] === "string") return value[0];
    return null;
  };

  // Prefer explicit server message when one is provided (including upstream
  // error explanations). Otherwise tell the user which field Django rejected.
  for (const key of ["message", "detail"]) {
    const text = getText(fields[key]);
    if (text) return text;
  }
  const names: Record<string, string> = {
    workshop_name: "Workshop name",
    owner_name: "Owner name",
    mobile: "Mobile number",
    email: "Email address",
    non_field_errors: "Registration",
  };
  for (const [key, value] of Object.entries(fields)) {
    const text = getText(value);
    if (text) return `${names[key] || key}: ${text}`;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        const nestedText = getText(nestedValue);
        if (nestedText) return `${names[nestedKey] || nestedKey}: ${nestedText}`;
      }
    }
  }
  return `Registration failed (HTTP ${status}). Please check your details or contact support.`;
}

// Preserve safe Django field errors so signup can highlight the relevant
// input rather than showing a generic failure at the bottom of the form.
export class SignupApiError extends Error {
  readonly fieldErrors: { mobile?: string };

  constructor(message: string, fieldErrors: { mobile?: string } = {}) {
    super(message);
    this.name = "SignupApiError";
    this.fieldErrors = fieldErrors;
  }
}

export async function createWorkshopAccount(
  payload: WorkshopSignupPayload,
): Promise<SignupResponse> {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as SignupResponse;

  if (!response.ok) {
    const message = getApiErrorMessage(data, response.status);
    const mobile = data && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>).mobile
      : null;
    const mobileError = typeof mobile === "string"
      ? mobile
      : Array.isArray(mobile) && typeof mobile[0] === "string"
        ? mobile[0]
        : undefined;
    throw new SignupApiError(message, mobileError ? { mobile: mobileError } : {});
  }

  return data;
}
