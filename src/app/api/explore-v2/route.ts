import { NextResponse } from "next/server";
import { initBigQuery } from "@/lib/bigquery";

export const dynamic = "force-dynamic";

const CONCEPTS = [
  { name: "Spectrum Keyboard", projectId: "8d70d9a1-efe8-4ec3-9ff5-2015680a89d1", iterationId: "22c2c584-aae1-413d-9879-86e24705cac5" },
  { name: "Fusion Axis", projectId: "20e07826-39d6-4b38-a3c2-7ea4281e4c3d", iterationId: "c8753ae4-0c9b-4f5c-bbda-a4acce49288a" },
  { name: "Genesis Modular Mouse System", projectId: "6d81b9ef-ccb7-4462-a2b5-0bdb049f3093", iterationId: "1dc9f0fe-0b3c-4802-8cb9-59e04ba73054" },
  { name: "The BOX", projectId: "a762498c-8e1f-479a-be38-abb43214b41c", iterationId: "e42c54e9-1ba7-4429-920c-0ae33994ddab" },
  { name: "Serene Flow", projectId: "2d774d4d-c857-4a14-91b7-a22f49a03ae9", iterationId: "69fd84b8-bbe6-4e27-81d9-2742e95abc28" },
];

const PROCEDURES = [
  "getMetaAdsAngle",
  "getMetaAdsDemographics",
  "getMetaAdsGeographics",
  "getMetaAdsInterests",
  "getIterationAdsBreakdownLogi",
  "getMetaAdsLikesSavesShares",
];

async function callProcedure(name: string, projectId: string, iterationId: string) {
  const bigquery = initBigQuery();
  try {
    const [rows] = await bigquery.query({
      query: `CALL \`prelaunch-transformed.prod_analytics.${name}\`('${projectId}', ['${iterationId}']);`,
    });
    return { name, ok: true, sample: rows.slice(0, 3), count: rows.length };
  } catch (err) {
    return { name, ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export async function GET() {
  const results = await Promise.all(
    CONCEPTS.map(async (concept) => {
      const procs = await Promise.all(PROCEDURES.map((p) => callProcedure(p, concept.projectId, concept.iterationId)));
      return { concept: concept.name, procs };
    })
  );

  return NextResponse.json({ results });
}
