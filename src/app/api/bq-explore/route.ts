import { NextResponse } from "next/server";
import { initBigQuery } from "@/lib/bigquery";

export const dynamic = "force-dynamic";

export async function GET() {
  const clientEmail = process.env.clientEmail;
  const privateKey = process.env.privateKey;
  const projectId = process.env.projectID;

  if (!clientEmail || !privateKey || !projectId) {
    return NextResponse.json(
      {
        error: "clientEmail, privateKey, or projectID env var is not set",
        diagnostics: {
          hasClientEmail: Boolean(clientEmail),
          hasPrivateKey: Boolean(privateKey),
          hasProjectId: Boolean(projectId),
        },
      },
      { status: 500 }
    );
  }

  const converted = privateKey.replace(/\\n/g, "\n");
  const keyDiagnostics = {
    rawLength: privateKey.length,
    rawHasLiteralBackslashN: privateKey.includes("\\n"),
    rawHasRealNewline: privateKey.includes("\n"),
    convertedLength: converted.length,
    convertedLineCount: converted.split("\n").length,
    startsWithBeginMarker: converted.trim().startsWith("-----BEGIN PRIVATE KEY-----"),
    endsWithEndMarker: converted.trim().endsWith("-----END PRIVATE KEY-----"),
    rawFirstChar: JSON.stringify(privateKey.slice(0, 1)),
    rawLastChar: JSON.stringify(privateKey.slice(-1)),
  };

  try {
    const bigquery = initBigQuery();
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

    return NextResponse.json({ datasets: result });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Unknown BigQuery error",
        diagnostics: keyDiagnostics,
      },
      { status: 500 }
    );
  }
}
