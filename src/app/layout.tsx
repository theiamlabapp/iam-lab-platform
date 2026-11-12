import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
const PAGE_TITLE = "The IAM Lab | Coming Soon";
const PAGE_DESCRIPTION =
  "The IAM Lab is preparing a new platform for Identity and Access Management consulting, identity security and professional learning.";
const OG_IMAGE_URL = `${SITE_URL}/brand/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  applicationName: "The IAM Lab",
  keywords: [
    "Identity and Access Management",
    "IAM Consulting",
    "Identity Security",
    "IAM Academy",
    "The IAM Lab",
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
  themeColor: "#050a14",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050a14] text-[#fefefe]">
        {children}
      </body>
    </html>
  );
}
