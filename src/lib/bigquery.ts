import { BigQuery } from "@google-cloud/bigquery";

const BQ_CLIENT_INFO = {
  BQ_PROJECT_ID: "prelaunch-transformed",
};

export const initBigQuery = () => {
  const clientEmail = process.env.BQ_CLIENT_EMAIL;
  const privateKey = process.env.BQ_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error("BQ_CLIENT_EMAIL or BQ_PRIVATE_KEY env var is not set");
  }

  return new BigQuery({
    projectId: BQ_CLIENT_INFO.BQ_PROJECT_ID,
    credentials: {
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, "\n"),
    },
  });
};
