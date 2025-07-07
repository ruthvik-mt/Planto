import Image from "next/image"
import ClickPhoto from "@/assets/click-photo.jpg"
import Processing from "@/assets/processing.jpg"
import Greenry from "@/assets/happy-greens.jpg"
import Header from "@/components/header"
import { siteConfig } from "@/config/site"

export default function HowItWorks() {
  return (
    <section className="container pt-24 px-8">
      <div>
        <Header heading={`How ${siteConfig.name} Works?`} />
      </div>
      <div className="grid md:grid-cols-3 gap-8 w-full mt-16">
        <div>
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
        </div>
        <div>
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
            VrikshaRakshak&apos;s advanced AI swiftly processes the uploaded image, utilizing a powerful machine learning model to analyze the leaf&apos;s visual traits and compare them against a vast database for accurate detection.
            </p>
          </div>
        </div>
        <div>
          <div className="h-72 relative">
            <Image
              src={Greenry}
              alt="Happy and Green Plants"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="py-4 text-center">
            <p>
            VrikshaRakshak delivers in-depth insights by identifying the exact disease affecting your plant. It provides a detailed overview of the plant, the disease, and effective remedies to ensure proper care.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
