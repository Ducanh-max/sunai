import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SUNAI — Learn Smarter. Speak Brighter.",
  description:
    "Build your English skills with guided lessons, daily practice, and AI-powered learning.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
