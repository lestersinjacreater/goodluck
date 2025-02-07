import type { Metadata } from "next"
import localFont from "next/font/local"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "./globals.css"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { Toaster } from "react-hot-toast"
import LandingPage from "@/components/LandingPage"
import type React from "react" // Import React

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "HireVueX",
  description: "HireVueX is a platform for hiring and interviewing.",
  icons: [
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/hirevuex-icon.svg",
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />

            <main className="">
              <SignedOut>
                {/* Show unauthenticated content */}
                <LandingPage />
              </SignedOut>

              <SignedIn>{children}</SignedIn>
            </main>
          </ThemeProvider>

          <Toaster />
        </body>
      </html>
    </ConvexClerkProvider>
  )
}

