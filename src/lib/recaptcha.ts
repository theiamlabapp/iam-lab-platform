export interface RecaptchaVerificationResult {
  valid: boolean;
  reason?: string;
  errorCodes?: string[];
  score?: number;
}

/**
 * Verifies a Google reCAPTCHA v2 or v3 response token strictly on the server.
 * Reads the private secret exclusively from process.env.RECAPTCHA_SECRET_KEY.
 */
export async function verifyRecaptchaToken({
  token,
  expectedVersion = "v2_checkbox",
  expectedAction = "contact_submit",
  remoteIp,
}: {
  token: string;
  expectedVersion?: "v2_checkbox" | "v3" | string;
  expectedAction?: string;
  remoteIp?: string;
}): Promise<RecaptchaVerificationResult> {
  const secret = (process.env.RECAPTCHA_SECRET_KEY || "").trim();
  if (!secret) {
    return {
      valid: false,
      reason: "Server reCAPTCHA secret key is not configured.",
    };
  }

  const cleanToken = (token || "").trim();
  if (!cleanToken) {
    return {
      valid: false,
      reason: "Please complete the security verification check before submitting.",
    };
  }

  const bodyParams = new URLSearchParams({
    secret,
    response: cleanToken,
  });
  if (remoteIp) {
    bodyParams.set("remoteip", remoteIp);
  }

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParams.toString(),
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        valid: false,
        reason: "Unable to verify security token with Google reCAPTCHA service.",
      };
    }

    const data = (await res.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
      "error-codes"?: string[];
    };

    const errorCodes = Array.isArray(data["error-codes"]) ? data["error-codes"] : [];

    if (!data.success) {
      if (errorCodes.includes("timeout-or-duplicate")) {
        return {
          valid: false,
          reason: "Security verification expired. Please try verifying again.",
          errorCodes,
        };
      }
      return {
        valid: false,
        reason: "Security verification failed. Please retry and submit again.",
        errorCodes,
      };
    }

    if (expectedVersion === "v3") {
      if (data.action && data.action !== expectedAction) {
        return {
          valid: false,
          reason: "Security verification action mismatch.",
          score: data.score,
        };
      }
      if (typeof data.score === "number" && data.score < 0.5) {
        return {
          valid: false,
          reason: "Submission could not pass automated spam protection threshold.",
          score: data.score,
        };
      }
    }

    return {
      valid: true,
      score: data.score,
    };
  } catch (err) {
    console.error("[recaptcha] Verification request failed:", err);
    return {
      valid: false,
      reason: "Verification service temporarily unavailable. Please try again.",
    };
  }
}
