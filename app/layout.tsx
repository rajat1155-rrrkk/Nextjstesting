import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Checker",
  description: "A polished Next.js 14 coding task checker with Monaco editor and client-side validation.",
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
