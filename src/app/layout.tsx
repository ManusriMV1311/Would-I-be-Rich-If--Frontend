import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "../components/Providers";
import ThemeProvider from "../components/ThemeProvider";
import Navbar from "../components/Navbar";
import ToastContainer from "../components/ui/ToastContainer";
import GlobalOverlay from "../components/GlobalOverlay";

// 🔥 BACKGROUNDS
import AnimatedBackground from "../components/AnimatedBackground";
import SplineBackground from "../components/ui/SplineBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Would I Be Rich If...? — Financial Time Machine",
  description:
    "Discover what your wealth could look like with real historical data.",
  openGraph: {
    title: "Would I Be Rich If...?",
    description: "A free financial time machine built on real data.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="relative bg-background text-foreground overflow-x-hidden">

        {/* 🌗 THEME PROVIDER */}
        <ThemeProvider />

        {/* 🎨 FIXED BACKGROUND LAYERS - BEHIND EVERYTHING */}
        <div className="fixed inset-0 -z-50 pointer-events-none">
          <SplineBackground />
        </div>

        <div className="fixed inset-0 -z-40 pointer-events-none overflow-hidden">
          <AnimatedBackground />
        </div>

        {/* 📱 MAIN CONTENT WRAPPER - ABOVE BACKGROUNDS */}
        <div className="relative z-0 flex flex-col min-h-screen">
          <Providers>
            <Navbar className="relative z-30" />
            <main className="flex-1 relative z-10">
              {children}
            </main>
            <ToastContainer />
            <GlobalOverlay />
          </Providers>
        </div>

      </body>
    </html>
  );
}