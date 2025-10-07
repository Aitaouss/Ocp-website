import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ocp website",
  description: "ocp website, dashboard and more",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-screen w-screen`}>{children}</body>
    </html>
  );
}
