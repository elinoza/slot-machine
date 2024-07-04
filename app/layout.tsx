import type { Metadata } from "next";
import { Rye } from "next/font/google";

import "./globals.css";

const rye = Rye({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slot Machine",
  description: "Give it a spin and find your luck!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rye.className}>{children}</body>
    </html>
  );
}
