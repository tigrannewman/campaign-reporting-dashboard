import { BigQuery } from "@google-cloud/bigquery";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const raw = process.env.googleCloud;
  if (!raw) {
    return NextResponse.json({ error: "googleCloud env var is not set" }, { status: 500 });
  }

  let credentials: { project_id?: string; client_email?: string; private_key?: string };
  try {
    const looksLikeJson = raw.trim().startsWith("{");
    const decoded = looksLikeJson ? raw : Buffer.from(raw, "base64").toString("utf8");
    credentials = JSON.parse(decoded);
  } catch {
    return NextResponse.json({ error: "googleCloud env var is not valid JSON or base64-encoded JSON" }, { status: 500 });
  }

  if (!credentials.private_key || !credentials.project_id) {
    return NextResponse.json({ error: "googleCloud env var is missing project_id or private_key" }, { status: 500 });
  }

  try {
    const bigquery = new BigQuery({
      projectId: credentials.project_id,
      credentials,
    });

    const [datasets] = await bigquery.getDatasets();

    const result = await Promise.all(
      datasets.map(async (dataset) => {
        const [tables] = await dataset.getTables();
        const tableInfos = await Promise.all(
          tables.map(async (table) => {
            const [metadata] = await table.getMetadata();
            return {
              id: table.id,
              rows: metadata.numRows ?? null,
              fields: (metadata.schema?.fields ?? []).map((f: { name: string }) => f.name),
            };
          })
        );
        return { dataset: dataset.id, tables: tableInfos };
      })
    );

    return NextResponse.json({ project: credentials.project_id, datasets: result });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown BigQuery error" },
      { status: 500 }
    );
  }
}
