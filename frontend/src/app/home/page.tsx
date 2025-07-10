"use client"

import { ImageBox } from "@/components/image-box"
import { siteConfig } from "@/config/site"

export default function Home() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-lime-100 via-emerald-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden">
      
      {/* Background Visual */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-emerald-300 via-transparent to-transparent pointer-events-none z-0" />
      
      {/* Main Content */}
      <div className="z-10 text-center px-6 md:px-12 space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-wide bg-gradient-to-r from-emerald-500 via-lime-500 to-teal-400 bg-clip-text text-transparent drop-shadow-md animate-fade-in">
          {siteConfig.name} – Plant Disease Detector
        </h1>

        <p className="text-base text-emerald-700 dark:text-emerald-300 font-semibold uppercase tracking-wider animate-fade-in">
          Nurturing Nature, Guided by Insight
        </p>

        {/* ✅ Only animation added; layout remains untouched */}
        <div className="mt-12 animate-fade-in">
          <ImageBox />
        </div>
      </div>
    </section>
  )
}
