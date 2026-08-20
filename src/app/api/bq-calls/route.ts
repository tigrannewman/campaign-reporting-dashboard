import { NextResponse } from "next/server";
import { initBigQuery } from "@/lib/bigquery";

export const dynamic = "force-dynamic";

const PROJECT_IDEA_ID = "e6843bbb-e6b8-4d97-bb59-9c6bedefec9d";
const VERSION_IDS = ["8cd76909-f3d4-4a8f-82dc-209a469bb0a6"];

export async function GET() {
  try {
    const bigquery = initBigQuery();
    const versionIdsSql = VERSION_IDS.map((id) => `'${id}'`).join(", ");

    const [anglesRows] = await bigquery.query({
      query: `CALL \`prelaunch-transformed.prod_analytics.getMetaAdsAngle\`('${PROJECT_IDEA_ID}', [${versionIdsSql}]);`,
    });

    const [demographicsRows] = await bigquery.query({
      query: `CALL \`prelaunch-transformed.prod_analytics.getMetaAdsDemographics\`('${PROJECT_IDEA_ID}', [${versionIdsSql}]);`,
    });

    return NextResponse.json({ angles: anglesRows, demographics: demographicsRows });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown BigQuery error" },
      { status: 500 }
    );
  }
}
