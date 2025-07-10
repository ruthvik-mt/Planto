// import { ThemeProvider } from "@/components/theme-provider"
// import type { Metadata } from "next"
// import { siteConfig } from "@/config/site"
// import { Inter } from "next/font/google"
// import { Navbar } from "@/components/navbar"
// import { Toaster } from "@/components/ui/toaster"
// import Footer from "@/components/footer"
// import "./globals.css"
// import QueryWrapper from "@/components/wrapper/query-wrapper"
// import Head from "next/head"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   metadataBase: new URL(siteConfig.url),
//   keywords: [
//     "Next.js",
//     "React",
//     "Tailwind CSS",
//     "Server Components",
//     "Radix UI",
//     "Shadcn UI",
//     "Plant Disease Detection",
//     "Plantiva",
//   ],
//   creator: "Ruthvik M T",
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: siteConfig.url,
//     title: siteConfig.name,
//     description: siteConfig.description,
//     siteName: siteConfig.name,
//     images: [
//       {
//         url: siteConfig.ogImage,
//         width: 1200,
//         height: 630,
//         alt: siteConfig.name,
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: siteConfig.name,
//     description: siteConfig.description,
//     images: [siteConfig.ogImage],
//     creator: "@RuthvikMT",
//   },
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "#ffffff" },
//     { media: "(prefers-color-scheme: dark)", color: "#000000" },
//   ],
//   authors: [
//     {
//       name: "Ruthvik M T",
//       url: siteConfig.url,
//     },
//   ],
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
//   manifest: "/site.webmanifest", // ✅ Required for PWA
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//        <Head>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>
//       <body className={inter.className}>
//         <QueryWrapper>
//           <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//             <Navbar />
//             {children}
//             <Footer />
//             <Toaster />
//           </ThemeProvider>
//         </QueryWrapper>
//       </body>
//     </html>
//   )
// }


import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import QueryWrapper from "@/components/wrapper/query-wrapper"
import ClientRoot from "./client-root" // ✅ client-only wrapper

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "Next.js", "React", "Tailwind CSS", "Server Components", "Radix UI",
    "Shadcn UI", "Plant Disease Detection", "Plantiva",
  ],
  creator: "Ruthvik M T",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@RuthvikMT",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  authors: [
    {
      name: "Ruthvik M T",
      url: siteConfig.url,
    },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryWrapper>
          <ClientRoot>
            {children}
          </ClientRoot>
        </QueryWrapper>
      </body>
    </html>
  )
}

