import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocaleProvider } from "@/components/LocaleProvider";
import { LocomotiveScrollProvider } from "@/components/LocomotiveScrollProvider";
import { SkipToContent } from "@/components/SkipToContent";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.legal} | Industrial Digital Transformation`,
    template: `%s | ${site.name}`,
  },
  description:
    "Zenuino Private Limited — DPIIT-recognised industrial IT consulting, digital transformation, managed services, and ERP for metals, mining, and power across India.",
  metadataBase: new URL("https://zenuino.in"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d141c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600&f[]=nunito@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <LocomotiveScrollProvider>
          <LocaleProvider>
            <SkipToContent />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </LocaleProvider>
        </LocomotiveScrollProvider>
      </body>
    </html>
  );
}
