"use client"

import { useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/footer"

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import("@/lib/register-sw")
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </ThemeProvider>
  )
}
