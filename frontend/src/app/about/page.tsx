// "use client"

// export default function About() {
//   return (
//     <main className="min-h-screen py-24 px-8">
//       <div className="animate-fade-in mx-auto prose max-w-[80ch] prose-cyan dark:prose-dark">
//         <h1>About the Project</h1>
//         <p>
//           <strong>Plantiva</strong> is an intelligent plant disease detection and remedy platform that empowers farmers, agriculturists, and hobbyists to diagnose crop health issues early using the power of AI and computer vision.
//         </p>
//         <p>
//           This web-based solution allows users to upload images of affected plant leaves, and in return, receive accurate predictions about the disease, confidence score, and treatment suggestions. It leverages a hybrid approach combining a custom-trained machine learning model with the <strong>Plant.id API</strong> for higher accuracy and reliability.
//         </p>
//         <p>
//           The goal is to minimize crop loss and maximize agricultural productivity by making disease detection fast, accessible, and easy to use — especially for those in remote or resource-constrained areas.
//         </p>
//         <h2>Key Features</h2>
//         <ul>
//           <li>Upload leaf images to detect plant diseases in real time</li>
//           <li>Combines results from a custom ML model and Plant.id API</li>
//           <li>Provides natural, biological, and chemical treatment options</li>
//           <li>Displays prediction accuracy to help make informed decisions</li>
//           <li>Mobile-friendly and works on any modern browser</li>
//         </ul>
//         <h2>Why Plantiva Matters</h2>
//         <ul>
//           <li><strong>Empowers Farmers & Gardeners:</strong> Enables early detection of plant diseases to prevent crop loss and reduce pesticide overuse.</li>
//           <li><strong>Bridges AI with Agriculture:</strong> Combines a custom-trained ML model and Plant.id API to ensure accurate, dual-source diagnosis.</li>
//           <li><strong>Accessible & Scalable:</strong> Designed to be easy to use locally and ready for cloud deployment, making it suitable for both small-scale and large-scale agricultural use.</li>
//           <li><strong>Fosters Sustainable Practices:</strong> Provides eco-friendly remedy suggestions (biological & cultural), promoting healthier farming techniques.</li>
//         </ul>

//         <p>
//           Whether your a farmer looking to save your crops, a researcher exploring plant pathology, or a student learning AI in agriculture, Plantiva offers a practical, modern, and meaningful solution to plant health management.
//         </p>
//       </div>
//     </main>
//   )
// }


"use client"

import { useEffect, useState } from "react"

export default function About() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true)
    }, 10)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-lime-100 via-emerald-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden py-24 px-6">
      {/* Background Visual Effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-emerald-300 via-transparent to-transparent pointer-events-none z-0" />

      {/* Main Content */}
      <div
        className={`z-10 mx-auto prose max-w-[80ch] prose-cyan dark:prose-invert transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-4xl font-black tracking-wide bg-gradient-to-r from-emerald-500 via-lime-500 to-teal-400 bg-clip-text text-transparent mb-6">
         About the Project
        </h1>
        <p>
          <strong>Plantiva</strong> is an intelligent plant disease detection and remedy platform that empowers
          farmers, agriculturists, and hobbyists to diagnose crop health issues early using the power of AI and
          computer vision.
        </p>
        <p>
          This web-based solution allows users to upload images of affected plant leaves, and in return, receive
          accurate predictions about the disease, confidence score, and treatment suggestions. It leverages a hybrid
          approach combining a custom-trained machine learning model with the <strong>Plant.id API</strong> for higher
          accuracy and reliability.
        </p>
        <p>
          The goal is to minimize crop loss and maximize agricultural productivity by making disease detection fast,
          accessible, and easy to use — especially for those in remote or resource-constrained areas.
        </p>

        <h1 className="text-4xl md:text-2xl font-black tracking-wide bg-gradient-to-r from-emerald-500 via-lime-500 to-teal-400 bg-clip-text text-transparent mb-6">
         Key Features
        </h1>
        <ul>
          <li>Upload leaf images to detect plant diseases in real time.</li>
          <li>Combines results from a custom ML model and Plant.id API.</li>
          <li>Provides natural, biological, and chemical treatment options.</li>
          <li>Displays prediction accuracy to help make informed decisions.</li>
          <li>Mobile-friendly and works on any modern browser.</li>
        </ul>

        <h1 className="text-4xl md:text-2xl font-black tracking-wide bg-gradient-to-r from-emerald-500 via-lime-500 to-teal-400 bg-clip-text text-transparent mb-6">
         Why Plantiva Matters
        </h1>
        <ul>
          <li>
            <strong>Empowers Farmers & Gardeners:</strong> Enables early detection of plant diseases to prevent crop
            loss and reduce pesticide overuse.
          </li>
          <li>
            <strong>Bridges AI with Agriculture:</strong> Combines a custom-trained ML model and Plant.id API to ensure
            accurate, dual-source diagnosis.
          </li>
          <li>
            <strong>Accessible & Scalable:</strong> Designed to be easy to use locally and ready for cloud deployment,
            making it suitable for both small-scale and large-scale agricultural use.
          </li>
          <li>
            <strong>Fosters Sustainable Practices:</strong> Provides eco-friendly remedy suggestions (biological &
            cultural), promoting healthier farming techniques.
          </li>
        </ul>

        <p>
          Whether you're a farmer looking to save your crops, a researcher exploring plant pathology, or a student
          learning AI in agriculture, Plantiva offers a practical, modern, and meaningful solution to plant health
          management.
        </p>
      </div>
    </section>
  )
}
