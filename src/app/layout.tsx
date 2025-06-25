import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

import { Sidebar } from "./_components/sidebar";

export const metadata: Metadata = {
  title: "Stock Management Dashboard",
  description: "A comprehensive dashboard for managing stock and sales data.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "auto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        cz-shortcut-listen="true"
        className={`h-full ${inter.variable} bg-white antialiased `}
      >
        <div className="flex h-screen">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
