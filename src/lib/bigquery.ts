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
