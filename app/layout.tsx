import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaustubh | Portfolio",
  description:
    "Interactive portfolio built with Next.js, Framer Motion, and shadcn/ui",
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
