import { NextResponse } from "next/server";
import { initBigQuery } from "@/lib/bigquery";
import { getTypeformFields, getTypeformResponses } from "@/lib/typeform";

export const dynamic = "force-dynamic";

const PROJECT_ID = "8d70d9a1-efe8-4ec3-9ff5-2015680a89d1";
const ITERATION_ID = "22c2c584-aae1-413d-9879-86e24705cac5";
const VISITORS_FORM_ID = "Hxa6ODRi";
const SUBSCRIBERS_FORM_ID = "VF7Y5tIM";

const PROCEDURES = [
  "getMetaAdsAngle",
  "getMetaAdsDemographics",
  "getMetaAdsGeographics",
  "getMetaAdsInterests",
  "getIterationAdsBreakdownLogi",
  "getMetaAdsLikesSavesShares",
];

async function callProcedure(name: string) {
  const bigquery = initBigQuery();
  try {
    const [rows] = await bigquery.query({
      query: `CALL \`prelaunch-transformed.prod_analytics.${name}\`('${PROJECT_ID}', ['${ITERATION_ID}']);`,
    });
    return { name, ok: true, sample: rows.slice(0, 5), count: rows.length };
  } catch (err) {
    return { name, ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

async function exploreTypeform(formId: string) {
  try {
    const [fields, { items, total }] = await Promise.all([
      getTypeformFields(formId),
      getTypeformResponses(formId),
    ]);
    return { formId, ok: true, fields, total, sample: items.slice(0, 3) };
  } catch (err) {
    return { formId, ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export async function GET() {
  const bqResults = await Promise.all(PROCEDURES.map(callProcedure));
  const tfResults = await Promise.all([exploreTypeform(VISITORS_FORM_ID), exploreTypeform(SUBSCRIBERS_FORM_ID)]);

  return NextResponse.json({ bigQuery: bqResults, typeform: tfResults });
}
