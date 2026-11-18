import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Enquiries } from "./src/payload/collections/Enquiries";
import { Media } from "./src/payload/collections/Media";
import { Pages } from "./src/payload/collections/Pages";
import { Users } from "./src/payload/collections/Users";
import { SiteSettings } from "./src/payload/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const rawDbUri = (process.env.DATABASE_URI || "").trim().replace(/^["']|["']$/g, "");
const rawSecret = (
  process.env.PAYLOAD_SECRET ||
  "the-iam-lab-enterprise-production-payload-secret-key-32chars"
)
  .trim()
  .replace(/^["']|["']$/g, "");

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— The IAM Lab Admin",
      icons: [{ rel: "icon", url: "/brand/the-iam-lab-logo.png" }],
      openGraph: {
        images: ["/brand/corporate-hero.jpg"],
      },
    },
    components: {
      graphics: {
        Logo: "/src/payload/components/Logo#Logo",
        Icon: "/src/payload/components/Icon#Icon",
      },
      Nav: "/src/payload/components/AdminNav#AdminNav",
      views: {
        dashboard: {
          Component: "/src/payload/views/DashboardView#DashboardView",
        },
        account: {
          Component: "/src/payload/views/AccountView#AccountView",
        },
        login: {
          Component: "/src/payload/views/LoginView#LoginView",
        },
      },
    },
  },
  collections: [Users, Media, Enquiries, Pages],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: rawSecret,
  serverURL:
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.theiamlab.com"),
  cors: "*",
  csrf: [],
  typescript: {
    outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: rawDbUri,
      ssl:
        rawDbUri.includes("supabase") ||
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : undefined,
      connectionTimeoutMillis: 10000,
      max: 10,
    },
    transactionOptions: false,
    push: false,
  }),
  sharp,
});
