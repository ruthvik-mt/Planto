import { Button } from "@/components/ui/button"
import Link from "next/link"
import ScrollDown from "@/components/scroll-down"
import { siteConfig } from "@/config/site"

export default function Introduction() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-lime-100 via-emerald-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden">
      {/* Background Visual */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-emerald-300 via-transparent to-transparent pointer-events-none z-0" />

      {/* Main Content */}
      <div className="z-10 text-center px-6 md:px-12 max-w-4xl space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide bg-gradient-to-r from-emerald-500 via-lime-500 to-teal-400 bg-clip-text text-transparent drop-shadow-md animate-fade-in">
          {siteConfig.name}
        </h1>

        <p className="text-base text-emerald-700 dark:text-emerald-300 font-semibold uppercase tracking-wider animate-fade-in ">
          Your intelligent companion for plant health
        </p>

        <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed max-w-2xl mx-auto animate-fade-in">
          {siteConfig.description}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto animate-fade-in">
          Our mission is to empower farmers and gardeners with AI-driven insights, enabling them to detect plant diseases early, act quickly, and protect their crops — sustainably and efficiently.
        </p>

        <div className="animate-fade-in delay-700">
          <Button
            className="text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg px-8 py-5 rounded-full shadow-xl transition-all duration-300"
            asChild
          >
            <Link href="/home">Use {siteConfig.name}</Link>
          </Button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 italic animate-fade-in delay-\[850ms]">
          Built with accessibility in mind – optimized for low-bandwidth regions and local languages.
        </p>
      </div>

      {/* Scroll Arrow at Bottom */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 animate-fade-in delay-\[1000ms]">
        <ScrollDown />
      </div>
    </section>
  )
}

