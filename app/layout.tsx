import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUNORA — Learn. Grow. Glow.",
  description: "AUNORA is your friendly AI-powered English learning space. Learn with guided lessons, daily practice, and a little dragon companion.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
