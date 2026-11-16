import { getPayload } from "payload";
import configPromise from "../payload.config.ts";

async function main() {
  console.log("[The IAM Lab] Initializing Payload CMS and syncing database schema...");
  try {
    const payload = await getPayload({ config: configPromise });
    console.log("[The IAM Lab] Payload CMS successfully initialized!");

    // Check Users
    const usersCount = await payload.count({ collection: "users" });
    console.log("[The IAM Lab] Users collection count:", usersCount.totalDocs);

    // Check Enquiries
    const enquiriesCount = await payload.count({ collection: "enquiries" });
    console.log("[The IAM Lab] Enquiries collection count:", enquiriesCount.totalDocs);

    // Check Pages
    const pagesCount = await payload.count({ collection: "pages" });
    console.log("[The IAM Lab] Pages collection count:", pagesCount.totalDocs);

    process.exit(0);
  } catch (error) {
    console.error("[The IAM Lab] Database initialization error:", error);
    process.exit(1);
  }
}

main();
