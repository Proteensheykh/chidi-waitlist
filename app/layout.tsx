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
    "Chidi is the AI assistant that runs your business through chat. Manage customers, orders, and inventory just by asking — and sell 24/7 through your Telegram self-service channel. WhatsApp & Instagram coming very soon.",
  keywords: [
    "social selling",
    "Telegram store",
    "Telegram business",
    "AI sales assistant",
    "AI for small business",
    "order management",
    "customer management",
    "inventory tracking",
    "small business",
    "self-service commerce",
    "chat commerce",
  ],
  authors: [{ name: "Chidi" }],
  openGraph: {
    title: "Chidi — Run Your Entire Business Through Chat",
    description:
      "Chidi is the AI assistant that runs your business through chat. Manage customers, orders, and inventory just by asking — and sell 24/7 through your Telegram self-service channel. WhatsApp & Instagram coming very soon.",
    type: "website",
    locale: "en_US",
    siteName: "Chidi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chidi — Run Your Entire Business Through Chat",
    description:
      "Chidi is the AI assistant that runs your business through chat. Manage customers, orders, and inventory just by asking — and sell 24/7 through your Telegram self-service channel. WhatsApp & Instagram coming very soon.",
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
