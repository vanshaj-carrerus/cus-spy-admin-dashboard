import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "CUS Spy Admin",
  description: "Monitor team members, departments, and locations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} font-outfit antialiased bg-gray-50/70`}>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 min-h-screen relative">
            {children}
            {/* Background Decorations */}
            <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-indigo-100/30 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 overflow-hidden"></div>
            <div className="fixed bottom-0 left-64 -z-10 w-[500px] h-[500px] bg-blue-100/20 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4 overflow-hidden"></div>
          </main>
        </div>
      </body>
    </html>
  );
}
