import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BackToTopButton } from "@/components/BackToTopButton";
import { getSiteSettings, getWhatsAppHref } from "@/lib/getPageData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.theiamlab.com";
const PAGE_TITLE = "The IAM Lab — Enterprise Identity Security & Professional Learning";
const PAGE_DESCRIPTION =
  "The IAM Lab helps organisations secure digital identities and manage access with greater clarity, control and efficiency, while equipping professionals with practical IAM capability.";
const OG_IMAGE_URL = `${SITE_URL}/brand/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_TITLE,
    template: "%s | The IAM Lab",
  },
  description: PAGE_DESCRIPTION,
  applicationName: "The IAM Lab",
  keywords: [
    "Identity and Access Management",
    "IAM Consulting",
    "Identity Governance",
    "IGA",
    "PAM",
    "Privileged Access Management",
    "Microsoft Entra ID",
    "Cloud IAM",
    "IAM Academy",
    "The IAM Lab",
    "Chiemezie Uzoma",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: SITE_URL,
    siteName: "The IAM Lab",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        secureUrl: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "The IAM Lab — Identity & Access Management",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1424",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function FrontendRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const whatsappHref = getWhatsAppHref(settings.whatsapp_number);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0B1424] text-slate-100 selection:bg-[#d6a15c]/30 selection:text-[#d6a15c]">
        <Navbar
          whatsappHref={whatsappHref}
          navLinks={settings.nav_links}
          ctaLabel={settings.header_cta_label}
          logoSrc={settings.logo_dark_url}
          officialEmail={settings.official_email}
          whatsappDisplay={settings.whatsapp_number}
        />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat href={whatsappHref} />
        <BackToTopButton />
      </body>
    </html>
  );
}
