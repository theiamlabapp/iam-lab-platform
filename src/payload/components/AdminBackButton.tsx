"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Clean circular mobile-only back navigation button rendered on internal admin pages
 * (automatically hidden on desktop and excluded from the main Dashboard view).
 */
export function AdminBackButton() {
  const pathname = usePathname() || "";
  const router = useRouter();

  const normalized = pathname.replace(/\/+$/, "");
  // Exclude main Dashboard (/admin) and login/auth routes
  if (
    !normalized ||
    normalized === "/admin" ||
    normalized === "/admin/login" ||
    normalized.startsWith("/admin/forgot") ||
    normalized.startsWith("/admin/reset")
  ) {
    return null;
  }

  const handleBack = () => {
    try {
      if (
        typeof window !== "undefined" &&
        window.history.length > 1 &&
        document.referrer &&
        new URL(document.referrer).origin === window.location.origin
      ) {
        router.back();
        return;
      }
    } catch {
      // fall back cleanly to Dashboard
    }
    router.push("/admin");
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back to previous page"
      title="Back"
      className="iam-mobile-back-btn"
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

export default AdminBackButton;
