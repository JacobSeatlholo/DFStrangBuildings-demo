import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "DF Strang Buildings | Engineering Legacy Since 1984 — Property Development KwaZulu-Natal",
  description:
    "Bespoke construction, joint-venture property developments, and long-term asset management across KwaZulu-Natal. 40+ years of excellence: 83+ residential projects, 62+ commercial developments, R2B+ assets delivered.",
  keywords: [
    "DF Strang Buildings",
    "construction KwaZulu-Natal",
    "property development Durban",
    "bespoke homes Umhlanga",
    "commercial construction South Africa",
    "joint venture property development",
  ],
  authors: [{ name: "DF Strang Buildings (Pty) Ltd" }],
  openGraph: {
    title: "DF Strang Buildings | Engineering Legacy Since 1984",
    description:
      "Bespoke construction, joint-venture property developments, and long-term asset management across KwaZulu-Natal.",
    type: "website",
    locale: "en_ZA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
