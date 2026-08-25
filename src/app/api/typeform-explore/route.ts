import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FORM_ID = "CXXaDh7x";

export async function GET() {
  const token = process.env.typeform;
  if (!token) {
    return NextResponse.json({ error: "typeform env var is not set" }, { status: 500 });
  }

  try {
    const [formRes, responsesRes] = await Promise.all([
      fetch(`https://api.typeform.com/forms/${FORM_ID}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`https://api.typeform.com/forms/${FORM_ID}/responses?page_size=10`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    if (!formRes.ok) {
      const text = await formRes.text();
      return NextResponse.json({ error: "form fetch failed", status: formRes.status, body: text }, { status: 500 });
    }
    if (!responsesRes.ok) {
      const text = await responsesRes.text();
      return NextResponse.json({ error: "responses fetch failed", status: responsesRes.status, body: text }, { status: 500 });
    }

    const form = await formRes.json();
    const responses = await responsesRes.json();

    return NextResponse.json({
      formTitle: form.title,
      fields: form.fields?.map((f: { id: string; ref?: string; title: string; type: string }) => ({
        id: f.id,
        ref: f.ref,
        title: f.title,
        type: f.type,
      })),
      totalResponses: responses.total_items,
      sampleResponses: responses.items,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
