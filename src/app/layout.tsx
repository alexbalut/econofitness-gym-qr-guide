import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Éconofitness Montréal — Machine guides",
    template: "%s · Éconofitness",
  },
  description:
    "Scan a machine QR or browse guides at Éconofitness Montréal — Salaberry. Bilingual EN/FR how-tos. Unofficial demo mockup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col font-sans"
        style={{ fontFamily: "var(--font-source-sans), var(--font-sans)" }}
      >
        {children}
      </body>
    </html>
  );
}
