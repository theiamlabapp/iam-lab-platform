import { getAuthenticatedStaffUser } from "@/payload/access/serverAuth";

/**
 * Allows viewing unpublished CMS drafts on public routes ONLY when
 * `?preview=draft` is requested by an authenticated staff/admin user.
 */
export async function resolveDraftPreview(
  searchParams?: Promise<Record<string, string | string[] | undefined>>
): Promise<boolean> {
  if (!searchParams) return false;
  try {
    const resolved = await searchParams;
    if (resolved?.preview !== "draft") return false;
    const staff = await getAuthenticatedStaffUser();
    return Boolean(staff);
  } catch {
    return false;
  }
}
