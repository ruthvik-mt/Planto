// import { DoubleArrowDownIcon } from "@radix-ui/react-icons"

// export default function ScrollDown() {
//   return (
//     <div className="animate-bounce [animation-duration:1500ms] absolute bottom-4">
//       <DoubleArrowDownIcon className="scale-125 md:scale-150" />
//     </div>
//   )
// }

"use client"

import { DoubleArrowDownIcon } from "@radix-ui/react-icons"

export default function ScrollDown() {
  const handleScroll = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <div
      onMouseEnter={handleScroll}
      className="animate-bounce [animation-duration:1500ms] absolute bottom-4 cursor-pointer"
    >
      <DoubleArrowDownIcon className="scale-125 md:scale-150" />
    </div>
  )
}
