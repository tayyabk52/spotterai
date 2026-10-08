import { NextResponse } from "next/server";
import { type QuoteRequestPayload } from "@/lib/api/quote";

/**
 * Local Next.js API Route for handling Quote Requests.
 * Acts as a resilient endpoint or proxy to an internal Django REST service.
 */
export async function POST(request: Request) {
  try {
    const payload: Partial<QuoteRequestPayload> = await request.json();

    // Field validation
    if (!payload.fullName || !payload.fullName.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name is required",
          errors: { fullName: "Full name is required" },
        },
        { status: 400 },
      );
    }

    if (
      !payload.email ||
      !payload.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid email address is required",
          errors: { email: "Valid email is required" },
        },
        { status: 400 },
      );
    }

    if (!payload.phone || !payload.phone.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is required",
          errors: { phone: "Phone number is required" },
        },
        { status: 400 },
      );
    }

    // Optional server-to-server proxy if private DJANGO_API_URL is configured
    const djangoPrivateUrl = process.env.DJANGO_API_URL;
    if (djangoPrivateUrl) {
      const djangoResponse = await fetch(
        `${djangoPrivateUrl.replace(/\/+$/, "")}/api/v1/quote-requests/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(process.env.DJANGO_API_TOKEN
              ? { Authorization: `Bearer ${process.env.DJANGO_API_TOKEN}` }
              : {}),
          },
          body: JSON.stringify(payload),
        },
      );

      if (!djangoResponse.ok) {
        const errorData = await djangoResponse.json().catch(() => null);
        return NextResponse.json(
          {
            success: false,
            message:
              errorData?.message || "Failed to submit to operations gateway",
            errors: errorData?.errors,
          },
          { status: djangoResponse.status },
        );
      }

      const djangoResult = await djangoResponse.json();
      return NextResponse.json(djangoResult, { status: 200 });
    }

    const referenceId = `REQ-${Date.now().toString(36).toUpperCase()}`;
    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting Spotter. An operations specialist will review your details and reach out within 1 business day.",
        referenceId,
      },
      { status: 200 },
    );
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { success: false, message: errorMsg },
      { status: 500 },
    );
  }
}
