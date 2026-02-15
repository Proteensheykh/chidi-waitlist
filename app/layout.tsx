import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chidi - Turn Social Media Conversations into Organised Sales",
  description:
    "Manage chats, customers, orders and stock in one place, and ask your business questions whenever you need clarity.",
  keywords: [
    "social selling",
    "WhatsApp business",
    "Instagram sales",
    "order management",
    "customer management",
    "inventory tracking",
    "small business",
    "conversational commerce",
  ],
  authors: [{ name: "Chidi" }],
  openGraph: {
    title: "Chidi - Turn Social Media Conversations into Organised Sales",
    description:
      "Manage chats, customers, orders and stock in one place, and ask your business questions whenever you need clarity.",
    type: "website",
    locale: "en_US",
    siteName: "Chidi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chidi - Turn Social Media Conversations into Organised Sales",
    description:
      "Manage chats, customers, orders and stock in one place, and ask your business questions whenever you need clarity.",
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
