import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Testing Task",
  description: "Minimal client-side code checker built with Next.js 14 and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
