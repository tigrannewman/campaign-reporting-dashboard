import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import CampaignChips from "@/components/CampaignChips";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prelaunch Reporting Dashboard",
  description: "Concept performance reporting dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-50 dark:bg-black">
        <Header />
        <div className="mx-auto w-full max-w-7xl">
          <CampaignChips />
        </div>
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-12 sm:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
