// "use client"

// import { ThemeToggle } from "@/components/ui/theme-toggle"
// import { siteConfig } from "@/config/site"
// import Link from "next/link"
// import { useState, useEffect } from "react"

// export function Navbar() {
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     const timeout = setTimeout(() => setMounted(true), 10)
//     return () => clearTimeout(timeout)
//   }, [])

//   return (
//     <nav className="flex fixed w-full backdrop-blur-sm items-center px-4 py-4 justify-between z-50">
//       <div className={`flex gap-8 items-center ${mounted ? "animate-fade-in" : "opacity-0"}`}>
//         <div>
//           <p className="scroll-m-20 text-2xl font-semibold tracking-tight cursor-pointer transition-colors duration-300 hover:text-emerald-500">
//             <Link href="/">{siteConfig.name}</Link>
//           </p>
//         </div>
//         <ul className="flex gap-6 text-lg font-medium">
//           <li className="cursor-pointer transition-colors duration-300 hover:text-emerald-500">
//             <Link href="/home">Home</Link>
//           </li>
//           <li className="cursor-pointer transition-colors duration-300 hover:text-emerald-500">
//             <Link href="/about">About</Link>
//           </li>
//         </ul>
//       </div>
//       <ThemeToggle />
//     </nav>
//   )
// }

"use client"

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { useState, useEffect } from "react"

export function Navbar() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 10)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <nav className="flex fixed w-full backdrop-blur-sm items-center px-4 py-4 justify-between z-50">
      <div className={`flex gap-8 items-center ${mounted ? "animate-fade-in" : "opacity-0"}`}>
        <div>
          <p className="scroll-m-20 text-2xl font-semibold tracking-tight cursor-pointer transition-colors duration-300 hover:text-emerald-500">
            <Link href="/">{siteConfig.name}</Link>
          </p>
        </div>
        <ul className="flex gap-6 text-lg font-medium">
          <li className="cursor-pointer transition-colors duration-300 hover:text-emerald-500">
            <Link href="/home">Home</Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-emerald-500">
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
      <ThemeToggle />
    </nav>
  )
}
