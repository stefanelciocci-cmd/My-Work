import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Stefan Ciocirlan | Full-Stack Developer",
  description:
    "Full-stack developer with 5+ years delivering end-to-end web solutions — from AI-powered tools to multi-tenant SaaS platforms. Based in Timisoara, Romania.",
  openGraph: {
    title: "Stefan Ciocirlan | Full-Stack Developer",
    description: "From AI-powered tools to multi-tenant SaaS platforms. Based in Timisoara, Romania.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        {/* The portfolio is designed dark-only; the provider keeps `dark:` variants and theme-aware components in sync. */}
        <ThemeProvider attribute="class" forcedTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
