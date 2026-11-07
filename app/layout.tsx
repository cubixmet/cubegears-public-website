import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { RouteScrollManager } from "@/components/RouteScrollManager";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = process.env.SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "CubixGears | Workshop Management Software",
    template: "%s | CubixGears",
  },
  description:
    "Manage car and motorcycle workshop customers, vehicles, job cards, inventory, invoices, staff and reports in one connected platform.",
  applicationName: "CubixGears",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "CubixGears",
    title: "CubixGears | Workshop Management Software",
    description: "A connected platform for modern car and motorcycle service workshops.",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#17385e" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={geistSans.variable + " " + geistMono.variable}>
      <body>
        <RouteScrollManager />
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
