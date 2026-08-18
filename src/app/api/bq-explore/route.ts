import { NextResponse } from "next/server";
import { initBigQuery } from "@/lib/bigquery";

export const dynamic = "force-dynamic";

export async function GET() {
  const clientEmail = process.env.BQ_CLIENT_EMAIL;
  const privateKey = process.env.BQ_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    return NextResponse.json(
      {
        error: "BQ_CLIENT_EMAIL or BQ_PRIVATE_KEY env var is not set",
        diagnostics: {
          hasClientEmail: Boolean(clientEmail),
          hasPrivateKey: Boolean(privateKey),
        },
      },
      { status: 500 }
    );
  }

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
      { error: err instanceof Error ? err.message : "Unknown BigQuery error" },
      { status: 500 }
    );
  }
}
