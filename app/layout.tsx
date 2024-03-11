import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";

const inter = Titillium_Web({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "F1 Draft Results",
  description: "Un-official draft results for the F1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
