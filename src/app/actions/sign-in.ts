"use server";

import { signIn } from "@/auth/auth";

export async function signInWithCredentials(params: {
  email: string;
  password: string;
}) {
  try {
    const result = await signIn("credentials", {
      ...params,
      redirect: false,
    });
    return result;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}
