"use client"

import Image from "next/image"
import ClickPhoto from "@/assets/click-photo.jpg"
import Processing from "@/assets/processing.jpg"
import Greenery from "@/assets/happy-greens.jpg"
import Header from "@/components/header"
import { siteConfig } from "@/config/site"
import { motion } from "framer-motion"

export default function HowItWorks() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-lime-100 via-emerald-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden px-6 py-24">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-emerald-300 via-transparent to-transparent pointer-events-none z-0" />

      {/* Section Heading */}
      <motion.div
        className="z-10 text-center mb-16 animate-fade-in"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Header heading={`How ${siteConfig.name} Works?`} />
        <p className="mt-4 text-md text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          A simple 3-step process to diagnose plant diseases accurately and get treatment suggestions instantly.
        </p>
      </motion.div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-3 gap-10 max-w-7xl z-10 w-full">
        {/* Step 1 */}
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="relative h-60 w-full mb-4 rounded-md overflow-hidden">
            <Image
              src={ClickPhoto}
              alt="A person clicking photo of plant"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-sm">
            Take a clear, well-lit photo of the plant leaf showing visible disease symptoms. Make sure the image is sharp to ensure accurate diagnosis. Then, easily upload it to the Plantive platform using our simple, user-friendly interface.
          </p>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="relative h-60 w-full mb-4 rounded-md overflow-hidden">
            <Image
              src={Processing}
              alt="Computer Processing the instruction"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-sm">
           Plantiva's cutting-edge AI quickly examines the uploaded leaf image, leveraging machine learning to study visual patterns and match them against an extensive plant disease database for precise identification.
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative h-60 w-full mb-4 rounded-md overflow-hidden">
            <Image
              src={Greenery}
              alt="Happy and Green Plants"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-sm">
            Plantiva offers detailed insights by accurately detecting the disease affecting the plant. It provides a thorough analysis of the plant’s condition, the identified issue, and suitable treatment measures for effective recovery.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
