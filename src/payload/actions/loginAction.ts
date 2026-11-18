"use server";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import { cookies } from "next/headers";

export interface LoginActionResult {
  success: boolean;
  error?: string;
  user?: {
    id: string | number;
    email: string;
    name?: string;
    role?: string;
  };
}

export async function loginAdminAction(formData: {
  email: string;
  password: string;
}): Promise<LoginActionResult> {
  const cleanEmail = (formData.email || "").trim().toLowerCase();
  const password = formData.password || "";

  if (!cleanEmail) {
    return { success: false, error: "Please enter your work email address." };
  }

  if (!password) {
    return { success: false, error: "Please enter your password." };
  }

  try {
    const config = await configPromise;
    const payload = await getPayload({ config });

    const result = await payload.login({
      collection: "users",
      data: {
        email: cleanEmail,
        password,
      },
    });

    if (result && result.token && result.user) {
      const cookieStore = await cookies();
      const isProduction = process.env.NODE_ENV === "production";

      // Set the standard Payload CMS auth token cookie in response headers
      cookieStore.set("payload-token", result.token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: isProduction,
        maxAge: 7200, // 2 hours
      });

      const userDoc = result.user as unknown as Record<string, unknown>;

      return {
        success: true,
        user: {
          id: result.user.id,
          email: result.user.email,
          name: typeof userDoc.name === "string" ? userDoc.name : undefined,
          role: typeof userDoc.role === "string" ? userDoc.role : undefined,
        },
      };
    }

    return {
      success: false,
      error: "The email or password provided is incorrect. Please verify your credentials.",
    };
  } catch (err: unknown) {
    console.error("[loginAdminAction] Authentication failure:", err);
    const errObj = err as { message?: string; name?: string } | undefined;
    const msg = errObj?.message || "";
    if (msg.includes("locked") || errObj?.name === "LockedAuth") {
      return {
        success: false,
        error: "This account has been temporarily locked due to failed attempts. Please wait a few minutes.",
      };
    }
    if (
      msg.includes("incorrect") ||
      msg.includes("Credentials") ||
      errObj?.name === "AuthenticationError"
    ) {
      return {
        success: false,
        error: "The email or password provided is incorrect. Please verify your credentials.",
      };
    }
    return {
      success: false,
      error: "Authentication failed. Please verify your administrator credentials.",
    };
  }
}
