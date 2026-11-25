import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import {
  getAuthenticatedStaffUser,
  hasEnquiryClearance,
} from "@/payload/access/serverAuth";
import { importMap } from "../importMap";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = async ({ params, searchParams }: Args) => {
  const resolvedParams = await params;
  if (resolvedParams?.segments?.[0] === "notifications") {
    const reqHeaders = await headers();
    const user = await getAuthenticatedStaffUser(reqHeaders);
    if (!user) {
      redirect("/admin/login");
    }
    if (!hasEnquiryClearance(user)) {
      redirect("/admin/unauthorized");
    }
  }

  return RootPage({ config, params, searchParams, importMap });
};

export default Page;
