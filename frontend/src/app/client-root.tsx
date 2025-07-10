"use client"

import { ThemeProvider } from "@/components/theme-provider"
import {Navbar} from "@/components/navbar" // ✅ FIXED - default import
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/footer"

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </ThemeProvider>
  )
}
