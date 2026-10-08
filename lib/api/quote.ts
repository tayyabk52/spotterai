/**
 * Quote Request API Client & Types.
 *
 * Provides an isolated abstraction for submitting information/quote requests.
 * Defaults to the local Next.js API route (/api/quote), but seamlessly switches
 * to an external Django REST API endpoint when NEXT_PUBLIC_DJANGO_API_URL is configured.
 */

export interface QuoteRequestPayload {
  fullName: string;
  email: string;
  phone: string;
  mcNumber?: string;
  notes?: string;
  fleetSize: string;
  productInterests: string[];
}

export interface QuoteApiResponse {
  success: boolean;
  message: string;
  referenceId?: string;
  errors?: Record<string, string>;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates quote request form input fields on the client before submission.
 */
export function validateQuoteForm(
  data: Partial<QuoteRequestPayload>,
): FormValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || !data.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!data.email || !data.email.trim()) {
    errors.email = "Email address is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.phone || !data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[\d\s+\-().]{7,20}$/.test(data.phone.trim())) {
    errors.phone = "Please enter a valid phone number";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Submits the quote request payload to the designated backend API.
 * Easily switchable to Django by setting NEXT_PUBLIC_DJANGO_API_URL in .env.
 */
export async function submitQuoteRequest(
  payload: QuoteRequestPayload,
): Promise<QuoteApiResponse> {
  const djangoBaseUrl = process.env.NEXT_PUBLIC_DJANGO_API_URL;
  const endpoint = djangoBaseUrl
    ? `${djangoBaseUrl.replace(/\/+$/, "")}/api/v1/quote-requests/`
    : "/api/quote";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || data?.success === false) {
    const errorMessage =
      data?.message ||
      (data?.errors ? Object.values(data.errors).join(", ") : undefined) ||
      `Submission failed (HTTP ${response.status})`;
    throw new Error(errorMessage);
  }

  if (!data || data.success !== true) {
    throw new Error(
      "Your request could not be confirmed. Please email sales@spotter.ai to contact our team.",
    );
  }

  return data;
}
