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
    <motion.section
      className="container pt-24 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="animate-fade-in">
        <Header heading={`How ${siteConfig.name} Works?`} />
      </div>
      <div className="grid md:grid-cols-3 gap-8 w-full mt-16">
        {/* Step 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="h-72 relative">
            <Image
              src={ClickPhoto}
              alt="A person clicking photo of plant"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="py-4 text-center">
            <p>
              Capture a clear, well-lit image of a plant leaf showing possible disease symptoms. Ensure the image is sharp for accurate analysis. Easily upload it to the VrikshaRakshak platform through our user-friendly interface.
            </p>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="h-72 relative">
            <Image
              src={Processing}
              alt="Computer Processing the instruction"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="py-4 text-center">
            <p>
              Plantiva&apos;s advanced AI swiftly processes the uploaded image, utilizing a powerful machine learning model to analyze the leaf&apos;s visual traits and compare them against a vast database for accurate detection.
            </p>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="h-72 relative">
            <Image
              src={Greenery}
              alt="Happy and Green Plants"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="py-4 text-center">
            <p>
              Plantiva delivers in-depth insights by identifying the exact disease affecting your plant. It provides a detailed overview of the plant, the disease, and effective remedies to ensure proper care.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
