import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Chidi — Run Your Entire Business Through Chat",
  description:
    "Manage customers, track orders, and close sales across WhatsApp and Telegram — all in one place. No spreadsheets. No switching apps. No chaos.",
  keywords: [
    "social selling",
    "WhatsApp business",
    "Telegram business",
    "Instagram sales",
    "order management",
    "customer management",
    "inventory tracking",
    "small business",
    "conversational commerce",
    "chat commerce",
  ],
  authors: [{ name: "Chidi" }],
  openGraph: {
    title: "Chidi — Run Your Entire Business Through Chat",
    description:
      "Manage customers, track orders, and close sales across WhatsApp and Telegram — all in one place.",
    type: "website",
    locale: "en_US",
    siteName: "Chidi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chidi — Run Your Entire Business Through Chat",
    description:
      "Manage customers, track orders, and close sales across WhatsApp and Telegram — all in one place.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400&display=swap" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
