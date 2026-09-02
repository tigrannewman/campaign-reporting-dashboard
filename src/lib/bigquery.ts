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

async function callAdsProcedure<T>(procedure: string, projectId: string, iterationIds: string[]): Promise<T[]> {
  const bigquery = initBigQuery();
  const idsSql = iterationIds.map((id) => `'${id}'`).join(", ");
  const [rows] = await bigquery.query({
    query: `CALL \`prelaunch-transformed.prod_analytics.${procedure}\`('${projectId}', [${idsSql}]);`,
  });
  return rows as T[];
}

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

export type MetaAdsGeographicsRow = {
  iterationId: string;
  iterationName: string;
  country: string;
  percent: number;
};

export type MetaAdsInterestsRow = {
  iterationId: string;
  iterationName: string;
  label: string;
  percent: number;
};

export type AdsBreakdownRow = {
  dateRange: string;
  iterationName: string;
  iterationNote: string;
  fbSpend: number;
  impressions: number;
  visits: number;
  subscriptions: number;
  subscriptionRate: number;
  costPerSubscription: number;
  cpc: number;
  ctr: number | null;
  cpm: number;
  projectId: string;
  iterationId: string;
};

export type MetaAdsLikesSavesSharesRow = {
  iterationId: string;
  iterationName: string;
  likes: number;
  saves: number;
  shares: number;
};

export function getMetaAdsAngles(projectId: string, iterationIds: string[]) {
  return callAdsProcedure<MetaAdsAngleRow>("getMetaAdsAngle", projectId, iterationIds);
}

export function getMetaAdsDemographics(projectId: string, iterationIds: string[]) {
  return callAdsProcedure<MetaAdsDemographicsRow>("getMetaAdsDemographics", projectId, iterationIds);
}

export function getMetaAdsGeographics(projectId: string, iterationIds: string[]) {
  return callAdsProcedure<MetaAdsGeographicsRow>("getMetaAdsGeographics", projectId, iterationIds);
}

export function getMetaAdsInterests(projectId: string, iterationIds: string[]) {
  return callAdsProcedure<MetaAdsInterestsRow>("getMetaAdsInterests", projectId, iterationIds);
}

export function getIterationAdsBreakdown(projectId: string, iterationIds: string[]) {
  return callAdsProcedure<AdsBreakdownRow>("getIterationAdsBreakdownLogi", projectId, iterationIds);
}

export function getMetaAdsLikesSavesShares(projectId: string, iterationIds: string[]) {
  return callAdsProcedure<MetaAdsLikesSavesSharesRow>("getMetaAdsLikesSavesShares", projectId, iterationIds);
}
