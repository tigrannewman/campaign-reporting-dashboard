export type TypeformField = {
  id: string;
  ref?: string;
  title: string;
  type: string;
  choices?: { id: string; label: string }[];
};

export type TypeformAnswer = {
  type: string;
  field: { id: string; ref?: string; type: string };
  text?: string;
  number?: number;
  email?: string;
  boolean?: boolean;
  url?: string;
  date?: string;
  choice?: { label: string };
  choices?: { labels: string[] };
};

export type TypeformResponseItem = {
  response_id?: string;
  token: string;
  submitted_at: string;
  hidden?: Record<string, string>;
  answers: TypeformAnswer[];
};

function requireToken() {
  const token = process.env.typeform;
  if (!token) {
    throw new Error("typeform env var is not set");
  }
  return token;
}

export async function getTypeformFields(formId: string): Promise<TypeformField[]> {
  const res = await fetch(`https://api.typeform.com/forms/${formId}`, {
    headers: { Authorization: `Bearer ${requireToken()}` },
  });
  if (!res.ok) {
    throw new Error(`Typeform form fetch failed: ${res.status}`);
  }
  const data = await res.json();
  return (data.fields ?? []).map(
    (f: TypeformField & { properties?: { choices?: { id: string; label: string }[] } }) => ({
      id: f.id,
      ref: f.ref,
      title: f.title,
      type: f.type,
      choices: f.properties?.choices?.map((c) => ({ id: c.id, label: c.label })),
    })
  );
}

export async function getTypeformResponses(formId: string): Promise<{ total: number; items: TypeformResponseItem[] }> {
  const res = await fetch(`https://api.typeform.com/forms/${formId}/responses?page_size=1000`, {
    headers: { Authorization: `Bearer ${requireToken()}` },
  });
  if (!res.ok) {
    throw new Error(`Typeform responses fetch failed: ${res.status}`);
  }
  const data = await res.json();
  return { total: data.total_items ?? 0, items: data.items ?? [] };
}

// total_items is accurate regardless of page_size, so a minimal page_size
// keeps this cheap when only the count is needed.
export async function getTypeformResponseCount(formId: string): Promise<number> {
  const res = await fetch(`https://api.typeform.com/forms/${formId}/responses?page_size=1`, {
    headers: { Authorization: `Bearer ${requireToken()}` },
  });
  if (!res.ok) {
    throw new Error(`Typeform responses fetch failed: ${res.status}`);
  }
  const data = await res.json();
  return data.total_items ?? 0;
}

export function formatAnswer(answer: TypeformAnswer | undefined): string {
  if (!answer) return "—";
  switch (answer.type) {
    case "text":
      return answer.text ?? "—";
    case "number":
      return answer.number !== undefined ? String(answer.number) : "—";
    case "email":
      return answer.email ?? "—";
    case "boolean":
      return answer.boolean ? "Yes" : "No";
    case "url":
      return answer.url ?? "—";
    case "date":
      return answer.date ?? "—";
    case "choice":
      return answer.choice?.label ?? "—";
    case "choices":
      return answer.choices?.labels.join(", ") ?? "—";
    default:
      return "—";
  }
}
