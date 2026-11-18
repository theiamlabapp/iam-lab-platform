import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginView } from "@/payload/views/LoginView";

export const metadata: Metadata = {
  title: "Super Administrator Sign In — The IAM Lab",
  description: "Secure administrative access for The IAM Lab enterprise platform.",
};

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0B1424",
            color: "#D89A43",
            fontFamily: "system-ui, sans-serif",
            fontSize: "14px",
          }}
        >
          Loading Enterprise Console...
        </div>
      }
    >
      <LoginView />
    </Suspense>
  );
}
