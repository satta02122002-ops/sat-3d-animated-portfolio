import type { Metadata, Viewport } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { BackToTop } from "@/components/ui/BackToTop";
import { Navbar } from "@/components/nav/Navbar";
import { profile } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

const siteUrl = "https://satteches.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} · Supply Chain & Logistics Professional · Dubai`,
    template: `%s · ${profile.name}`,
  },
  description:
    "Premium portfolio of Sattanathan Chandran — Supply Chain & Logistics Professional based in Dubai, UAE. SAP S/4HANA power user driving inventory accuracy, freight forwarding excellence, customs compliance, and process automation.",
  keywords: [
    "Supply Chain Professional Dubai",
    "Logistics Coordinator UAE",
    "Supply Chain Analyst",
    "Warehouse Operations",
    "Logistics Management",
    "SAP S/4HANA Power User",
    "Freight Forwarding Dubai",
    "Mirsal 2 Customs",
    "Sattanathan Chandran",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} · Supply Chain & Logistics Professional`,
    description:
      "Transforming global supply chains through operational excellence. SAP S/4HANA power user, automation builder, and freight forwarding specialist based in Dubai, UAE.",
    siteName: `${profile.name} Portfolio`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · Supply Chain & Logistics Professional`,
    description:
      "Premium executive portfolio — supply chain, logistics, SAP S/4HANA, and process automation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: siteUrl,
  sameAs: [profile.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  knowsAbout: [
    "Supply Chain Management",
    "Logistics Coordination",
    "Freight Forwarding",
    "SAP S/4HANA",
    "Inventory Management",
    "Warehouse Operations",
    "UAE Customs / Mirsal 2",
    "Excel VBA Automation",
    "Power BI",
    "Lean Six Sigma",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-midnight text-silver-100 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LoadingScreen />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main className="relative">{children}</main>
        <BackToTop />
      </body>
    </html>
  );
}
