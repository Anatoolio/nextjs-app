"use server";

import { signOut } from "@/auth/auth";

export async function signOutUser() {
  try {
    const result = await signOut({ redirect: false });
    return result;
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}
