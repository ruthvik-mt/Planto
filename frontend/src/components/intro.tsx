import { Button } from "@/components/ui/button"
import Link from "next/link"
import ScrollDown from "@/components/scroll-down"
import { siteConfig } from "@/config/site"

export default function Introduction() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-11/12 max-w-3xl flex flex-col items-center text-center">
        <h1 className="scroll-m-20 mb-6 text-5xl font-extrabold tracking-tight lg:text-6xl xl:text-7xl uppercase gradient-text">
          {siteConfig.name}
        </h1>
        <p className="text-center text-lg md:text-xl lg:text-2xl mt-8 max-w-2xl">
          {siteConfig.description}
        </p>
        <Button className="my-10 text-lg py-6 px-8" asChild>
          <Link href="/home">Use {siteConfig.name}</Link>
        </Button>
      </div>
      <ScrollDown />
    </section>
  )
}
