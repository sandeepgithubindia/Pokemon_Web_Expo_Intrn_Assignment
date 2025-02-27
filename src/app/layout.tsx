import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Pokémon Explorer - Discover All Pokémon",
  description: "Explore Pokémon details, abilities, types, and stats with our Next.js-powered Pokémon Explorer.",
  keywords: "Pokémon, PokeAPI, Next.js, Pokémon Explorer, Pokémon details, Pokémon types, Pokémon abilities",
  authors: [
    {
      name: "Sandeep Kumar Patel",
      url: "https://github.com/sandeepgithubindia/Pokemon_Explorer_Internship_Assigment.git",
    },
  ],
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
        {children}
      </body>
    </html>
  );
}
