"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { initiateCognitoAuth, completeNewPasswordChallenge } from "@/lib/cognito";

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export type LoginState =
  | { error: string; challenge?: undefined }
  | { challenge: "NEW_PASSWORD_REQUIRED"; email: string; session: string; error?: undefined }
  | undefined;

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let result;
  try {
    result = await initiateCognitoAuth(email, password);
    console.log("[login] initiateCognitoAuth status:", result.status);
  } catch (err) {
    console.error("[login] initiateCognitoAuth threw:", err);
    return { error: "Invalid email or password." };
  }

  if (result.status === "challenge") {
    if (result.challengeName !== "NEW_PASSWORD_REQUIRED") {
      console.log("[login] unsupported challenge:", result.challengeName);
      return { error: "This account requires additional setup. Contact your administrator." };
    }
    return { challenge: "NEW_PASSWORD_REQUIRED", email, session: result.session };
  }

  try {
    console.log("[login] calling signIn for", email);
    await signIn("credentials", { email, password, redirectTo: "/" });
    console.log("[login] signIn returned without redirecting (unexpected)");
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("[login] signIn threw AuthError:", error.type, error.message);
      return { error: "Invalid email or password." };
    }
    console.log("[login] signIn threw non-AuthError (likely the redirect signal):", error instanceof Error ? error.message : error);
    throw error;
  }
}

export type NewPasswordState = { error?: string } | undefined;

export async function completeNewPasswordAction(
  _prevState: NewPasswordState,
  formData: FormData
): Promise<NewPasswordState> {
  const email = formData.get("email") as string;
  const session = formData.get("session") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match." };
  }
  if (newPassword.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  try {
    await completeNewPasswordChallenge(email, newPassword, session);
  } catch (err) {
    console.error("Failed to set new password:", err);
    return { error: "Could not set new password. It may not meet the account's password policy." };
  }

  try {
    await signIn("credentials", { email, password: newPassword, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Password updated, but sign-in failed. Please try logging in again." };
    }
    throw error;
  }
}
