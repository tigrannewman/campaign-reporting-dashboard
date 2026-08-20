import { BigQuery } from "@google-cloud/bigquery";

export const initBigQuery = () => {
  const clientEmail = process.env.clientEmail;
  const privateKey = process.env.privateKey;
  const projectId = process.env.projectID;

  if (!clientEmail || !privateKey || !projectId) {
    throw new Error("clientEmail, privateKey, or projectID env var is not set");
  }

  return new BigQuery({
    projectId,
    credentials: {
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, "\n"),
    },
  });
};

export type MetaAdsAngleRow = {
  iterationId: string;
  iterationName: string;
  label: string;
  percent: number;
};

export type MetaAdsDemographicsRow = {
  iterationId: string;
  iterationName: string;
  age: string;
  gender: string;
  percent: number;
};

export async function getMetaAdsAngles(projectIdeaId: string, versionIds: string[]) {
  const bigquery = initBigQuery();
  const versionIdsSql = versionIds.map((id) => `'${id}'`).join(", ");
  const [rows] = await bigquery.query({
    query: `CALL \`prelaunch-transformed.prod_analytics.getMetaAdsAngle\`('${projectIdeaId}', [${versionIdsSql}]);`,
  });
  return rows as MetaAdsAngleRow[];
}

export async function getMetaAdsDemographics(projectIdeaId: string, versionIds: string[]) {
  const bigquery = initBigQuery();
  const versionIdsSql = versionIds.map((id) => `'${id}'`).join(", ");
  const [rows] = await bigquery.query({
    query: `CALL \`prelaunch-transformed.prod_analytics.getMetaAdsDemographics\`('${projectIdeaId}', [${versionIdsSql}]);`,
  });
  return rows as MetaAdsDemographicsRow[];
}
