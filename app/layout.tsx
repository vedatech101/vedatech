import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealSafety } from "@/components/reveal";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", fallback: ["Arial", "sans-serif"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap", fallback: ["Arial", "sans-serif"] });
export const metadata: Metadata = { title: "VedaTech | Custom Software Development", description: "Custom software development for businesses that want clarity, control, and momentum.", icons: { icon: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}><body><RevealSafety /><SiteHeader />{children}<SiteFooter /></body></html>; }
