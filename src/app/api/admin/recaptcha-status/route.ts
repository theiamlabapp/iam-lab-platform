import { NextResponse } from "next/server";
import { getAuthenticatedStaffUser, hasAdminClearance } from "@/payload/access/serverAuth";

/**
 * Returns ONLY a boolean indicating whether RECAPTCHA_SECRET_KEY exists in server env.
 * Restricted strictly to Super Admin / Administrator roles; never exposes any key value.
 */
export async function GET(req: Request) {
  const user = await getAuthenticatedStaffUser(req.headers);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAdminClearance(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    secretConfigured: Boolean(process.env.RECAPTCHA_SECRET_KEY?.trim()),
  });
}
