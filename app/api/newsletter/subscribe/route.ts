const OPTIONAL_FIELDS = [
  "timestamp",
  "userAgent",
  "referrer",
  "pageUrl",
  "timezone",
  "language",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmContent",
  "utmTerm",
] as const;

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json({ success: false }, { status: 415, headers });
  const bodyText = await request.text();
  if (bodyText.length > 16000)
    return Response.json({ success: false }, { status: 413, headers });
  let input: Record<string, unknown>;
  try {
    input = JSON.parse(bodyText);
  } catch {
    return Response.json({ success: false }, { status: 400, headers });
  }
  if (
    !input ||
    typeof input !== "object" ||
    typeof input.email !== "string" ||
    input.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())
  )
    return Response.json({ success: false }, { status: 400, headers });
  try {
    const endpoint = new URL(
      process.env.NEWSLETTER_API_URL ||
        "https://spotter.ai/api/newsletter/subscribe",
    );
    // Preserve the source endpoint locally; a deployed same-domain installation
    // must route /api/newsletter to Django or set its direct URL to avoid recursion.
    if (
      !/^https?:$/.test(endpoint.protocol) ||
      endpoint.host === new URL(request.url).host ||
      request.headers.has("x-insights-newsletter-proxy")
    )
      return Response.json({ success: false }, { status: 503, headers });
    const payload: Record<string, string> = {
      email: input.email.trim(),
      source: "insights",
    };
    for (const field of OPTIONAL_FIELDS)
      if (typeof input[field] === "string")
        payload[field] = input[field].slice(0, 2000);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Insights-Newsletter-Proxy": "1",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
      redirect: "error",
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.success !== true)
      return Response.json(
        { success: false },
        { status: response.status === 429 ? 429 : 502, headers },
      );
    return Response.json({ success: true }, { headers });
  } catch {
    return Response.json({ success: false }, { status: 503, headers });
  }
}
