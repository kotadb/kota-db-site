import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KotaDB - Codebase Intelligence Platform",
  description:
    "A codebase intelligence platform that understands your code's relationships, dependencies, and structure. Powers LLM tooling like Claude Code for dramatically improved codebase understanding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
