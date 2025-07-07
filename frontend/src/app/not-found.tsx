import Image from "next/image"
import Coconut from "@/assets/coconut.png"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex justify-center items-center py-24 px-4">
      <Image
        src={Coconut}
        alt="Hanging Coconut Leaves"
        width={500}
        className="absolute top-0 right-0 -z-10"
        aria-hidden="true"
        priority
      />
      <div className="text-center">
        <h1 className="scroll-m-20 mb-8 text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
          Error 404 - Page Not Found
        </h1>
        <h2 className="scroll-m-20 pb-2 text-xl md:text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          You have lost your way
        </h2>
        <Link
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </main>
  )
}
