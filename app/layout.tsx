import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Board Meeting Preparation",
  description: "Diligent Board Intelligence — meeting prep and briefing tool",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="atlas-light">
      <body>{children}</body>
    </html>
  );
}
