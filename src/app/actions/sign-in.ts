"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth/auth";

export async function signInWithCredentials(params: {
  email: string;
  password: string;
}) {
  try {
    return await signIn("credentials", {
      ...params,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("Auth error signing in:", error);
    } else {
      console.error("Error signing in:", error);
    }
  }
}
