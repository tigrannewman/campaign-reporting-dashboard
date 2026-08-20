"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export type LoginState = { error?: string } | undefined;

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }
}
