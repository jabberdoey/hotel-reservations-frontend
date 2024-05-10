import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";
import Layout from "@/components/layout/layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotel Reservations",
  description: "Manage hotel reservations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(
        "bg-black",
        inter.className,
      )}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
