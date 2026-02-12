import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import StructuredData from "./components/StructuredData";

const neueRegrade = localFont({
  src: [
    {
      path: "./fonts/Neue Regrade Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Neue Regrade Regular Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Neue Regrade Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Neue Regrade Semibold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-neue-regrade",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Cacao Mobile | Mobile Product Development & Design",
    template: "%s | Cacao Mobile"
  },
  description: "We create mobile products that turn ideas into scalable growth. Expert mobile app development, UI/UX design, and product strategy.",
  keywords: ["mobile app development", "product design", "UI/UX design", "mobile products", "app development agency", "iOS development", "Android development"],
  authors: [{ name: "Cacao Mobile" }],
  creator: "Cacao Mobile",
  publisher: "Cacao Mobile",
  metadataBase: new URL("https://cacao-mobile.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Cacao Mobile",
    title: "Cacao Mobile | Mobile Product Development & Design",
    description: "We create mobile products that turn ideas into scalable growth. Expert mobile app development, UI/UX design, and product strategy.",
    images: [
      {
        url: "/og-image.png",
        width: 512,
        height: 512,
        alt: "Cacao Mobile - Mobile Product Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cacao Mobile | Mobile Product Development & Design",
    description: "We create mobile products that turn ideas into scalable growth. Expert mobile app development, UI/UX design, and product strategy.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <StructuredData />
      </head>
      <body className={`${neueRegrade.variable} antialiased cursor-none`}>
        <LoadingScreen />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
