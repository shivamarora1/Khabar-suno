import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./ui/globals.css";
import "@progress/kendo-theme-default/dist/all.css";
import React from "react";
import MainContainerComponent from "./ui/MainContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khabar Suno",
  description: "Khabar Suno description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainContainerComponent>
          <div className="flex justify-center h-[94vh]">
            <main className="w-3xl">{children}</main>
          </div>
        </MainContainerComponent>
      </body>
    </html>
  );
}
