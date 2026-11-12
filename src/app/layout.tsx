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

const SITE_URL = "https://theiamlab.com";
const PAGE_TITLE = "The IAM Lab | Identity & Access Management Consulting";
const PAGE_DESCRIPTION =
  "The IAM Lab helps organisations strengthen identity security through IAM consulting and solutions while empowering individuals through professional learning and career development.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  applicationName: "The IAM Lab",
  keywords: [
    "Identity and Access Management",
    "IAM Consulting",
    "Identity Security",
    "Access Governance",
    "Identity Lifecycle Management",
    "IAM Academy",
    "IAM Training",
    "IAM Career Development",
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
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1320",
  width: "device-width",
  initialScale: 1,
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
      <body className="flex min-h-full flex-col bg-[#fefefe] text-[#111111]">
        {children}
      </body>
    </html>
  );
}
