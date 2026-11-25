import React from "react";
import { redirect } from "next/navigation";
import { DefaultTemplate } from "@payloadcms/next/templates";
import type { AdminViewServerProps } from "payload";
import { ENQUIRY_ROLES } from "../access/roles";
import { NotificationsManager } from "../components/NotificationsManager";

/**
 * Dedicated Super Admin Notification Centre (/admin/notifications).
 * Strictly restricted to authorised administrative & enquiry staff.
 */
export async function NotificationsView(props: AdminViewServerProps) {
  const { initPageResult, params, searchParams } = props;
  const reqUser = initPageResult?.req?.user as
    | { id?: number | string; role?: string }
    | undefined;
  const role = String(reqUser?.role || "").toLowerCase();

  if (!reqUser?.id) {
    redirect("/admin/login");
  }
  if (!ENQUIRY_ROLES.has(role)) {
    redirect("/admin/unauthorized");
  }

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      req={initPageResult.req}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      viewActions={[...(props.viewActions || [])]}
      visibleEntities={{
        collections: initPageResult.visibleEntities?.collections,
        globals: initPageResult.visibleEntities?.globals,
      }}
    >
      <NotificationsManager />
    </DefaultTemplate>
  );
}

export default NotificationsView;
