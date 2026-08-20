import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";

function getRegion() {
  const issuer = process.env.COGNITO_ISSUER ?? "";
  const match = issuer.match(/cognito-idp\.([a-z0-9-]+)\.amazonaws\.com/);
  if (!match) {
    throw new Error("Could not determine AWS region from COGNITO_ISSUER");
  }
  return match[1];
}

function secretHash(username: string) {
  const clientId = process.env.COGNITO_CLIENT_ID;
  const clientSecret = process.env.COGNITO_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("COGNITO_CLIENT_ID or COGNITO_CLIENT_SECRET env var is not set");
  }
  return crypto.createHmac("sha256", clientSecret).update(username + clientId).digest("base64");
}

function decodeIdTokenPayload(idToken: string) {
  const payloadSegment = idToken.split(".")[1];
  const json = Buffer.from(payloadSegment, "base64url").toString("utf8");
  return JSON.parse(json) as { sub: string; email?: string; name?: string };
}

function getClient() {
  return new CognitoIdentityProviderClient({ region: getRegion() });
}

function requireClientId() {
  const clientId = process.env.COGNITO_CLIENT_ID;
  if (!clientId) {
    throw new Error("COGNITO_CLIENT_ID env var is not set");
  }
  return clientId;
}

export type CognitoAuthResult =
  | { status: "success"; user: { id: string; email?: string; name?: string } }
  | { status: "challenge"; challengeName: string; session: string };

export async function initiateCognitoAuth(email: string, password: string): Promise<CognitoAuthResult> {
  const clientId = requireClientId();

  const response = await getClient().send(
    new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: secretHash(email),
      },
    })
  );

  if (response.ChallengeName) {
    if (!response.Session) {
      throw new Error("Cognito returned a challenge with no session token");
    }
    return { status: "challenge", challengeName: response.ChallengeName, session: response.Session };
  }

  const idToken = response.AuthenticationResult?.IdToken;
  if (!idToken) {
    throw new Error("Cognito did not return an ID token");
  }

  const payload = decodeIdTokenPayload(idToken);
  return {
    status: "success",
    user: { id: payload.sub, email: payload.email, name: payload.name ?? payload.email },
  };
}

export async function completeNewPasswordChallenge(email: string, newPassword: string, session: string) {
  const clientId = requireClientId();

  await getClient().send(
    new RespondToAuthChallengeCommand({
      ClientId: clientId,
      ChallengeName: "NEW_PASSWORD_REQUIRED",
      Session: session,
      ChallengeResponses: {
        USERNAME: email,
        NEW_PASSWORD: newPassword,
        SECRET_HASH: secretHash(email),
      },
    })
  );
}

export async function authenticateWithCognito(email: string, password: string) {
  const result = await initiateCognitoAuth(email, password);
  if (result.status === "challenge") {
    throw new Error(`Additional step required: ${result.challengeName}`);
  }
  return result.user;
}
