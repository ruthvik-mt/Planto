// "use client"
// import { Button } from "@/components/ui/button"
// import { ChangeEvent, FormEvent, useState } from "react"
// import { useToast } from "@/components/ui/use-toast"
// import Image from "next/image"
// import { useQuery } from "@tanstack/react-query"
// import Result from "@/components/result"
// import { ReloadIcon } from "@radix-ui/react-icons"

// interface FormData {
//   images: (string | ArrayBuffer | null)[]
//   similar_images: boolean
// }

// export function ImageBox() {
//   const [imageFile, setImageFile] = useState<File | null>(null)
//   const [formData, setFormData] = useState<FormData[]>([])
//   const [imageURL, setImageURL] = useState<string>()
//   const { toast } = useToast()

//   function onImageUpload(e: ChangeEvent<HTMLInputElement>) {
//     if (!e.target.files || !e.target.files[0]) return
//     setImageFile(e.target.files[0] ?? null)
//     toast({
//       variant: "success",
//       title: "Image Uploaded",
//       description: `${e.target.files[0].name} Uploaded Successfully`,
//     })
//     setImageURL(URL.createObjectURL(e.target.files[0]))
//   }

//   const { isInitialLoading, error, data, refetch } = useQuery({
//     queryKey: ["plantData"],
//     enabled: false,
//     queryFn: () =>
//       fetch(
//         "https://plant.id/api/v3/health_assessment?language=en&details=local_name,description,url,treatment,classification,common_names,cause",
//         {
//           method: "POST",
//           headers: {
//             "Api-Key": process.env.NEXT_PUBLIC_PLANT_ID_API_KEY!,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData[0]),
//         }
//       ).then((res) => res.json()),
//   })

//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     if (!imageFile) return

//     let reader = new FileReader()

//     // Converting Image to Base64 string
//     reader.readAsDataURL(imageFile)

//     reader.onload = function () {
//       const bodyData = {
//         images: [reader.result],
//         similar_images: true,
//       }
//       formData.push(bodyData)
//     }

//     await refetch()
//   }

//   return (
//     <section className="mt-8 md:mt-4">
//       <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
//         <div className="flex flex-col items-center">
//           <label htmlFor="plant-image" className="cursor-pointer">
//             <div className="relative w-72 mt-4 flex items-center justify-center aspect-square mx-auto border-2 dark:border-white border-black border-dashed rounded-lg">
//               {imageURL ? (
//                 <Image src={imageURL} alt="Image" fill className="rounded-lg" />
//               ) : (
//                 <div className="flex flex-col gap-2 p-4 justify-center items-center">
//                   {/* <Image
//                     src="/logo.png"
//                     alt="Logo"
//                     width={48}
//                     height={48}
//                   /> */}
//                   <p className="text-center">Upload Plant Image Here</p>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 name="plant-image"
//                 id="plant-image"
//                 className="hidden"
//                 accept=".png, .jpeg, .jpg"
//                 onChange={onImageUpload}
//                 required
//               />
//             </div>
//           </label>
//           <div className="mt-4">
//             {imageFile === null ? (
//               <Button disabled className="select-none">
//                 Add Image to Proceed
//               </Button>
//             ) : (
//               <div className="flex flex-col justify-center gap-4 items-center">
//                 <p>{imageFile.name} Uploaded!</p>
//                 {/* Disable the button when the process is running or already previous data is there */}
//                 <Button type="submit" disabled={isInitialLoading || data}>
//                   {isInitialLoading && (
//                     <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
//                   )}
//                   Detect Disease
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </form>
//       {data ? <Result data={data} /> : ""}
//     </section>
//   )
// }

"use client"

import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEvent, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import Result from "@/components/result"
import { ReloadIcon } from "@radix-ui/react-icons"

interface CustomResult {
  plant: string
  disease: string
  confidence: string
  remedy: string | string[]
  source: string
}

interface ResponseData {
  custom: CustomResult
  plantid?: {
    suggestions?: any[] // You can replace `any` with Suggestion[] if types are imported
  }
}

export function ImageBox() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageURL, setImageURL] = useState<string>()
  const [data, setData] = useState<ResponseData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  function onImageUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return
    const file = e.target.files[0]
    setImageFile(file)
    setImageURL(URL.createObjectURL(file))
    setData(null)

    toast({
      variant: "success",
      title: "Image Uploaded",
      description: `${file.name} uploaded successfully!`,
    })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!imageFile) return

    const reader = new FileReader()
    reader.readAsDataURL(imageFile)

    reader.onload = async () => {
      const base64Image = (reader.result as string).split(",")[1]
      const mime = imageFile.type || "image/jpeg"
      setIsLoading(true)

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image, mime }),
        })

        if (!response.ok) throw new Error("Failed to fetch from backend")

        const json: ResponseData = await response.json()
        setData(json)
      } catch (err: any) {
        setError(err.message || "Unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <section className="mt-8 md:mt-4 animate-fade-in">
      <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <label htmlFor="plant-image" className="cursor-pointer">
            <div className="relative w-72 mt-4 flex items-center justify-center aspect-square mx-auto border-2 dark:border-white border-black border-dashed rounded-lg overflow-hidden">
              {imageURL ? (
                <Image
                  src={imageURL}
                  alt="Uploaded Image"
                  fill
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="flex flex-col gap-2 p-4 justify-center items-center">
                  <p className="text-center">Upload Plant Image Here</p>
                </div>
              )}
              <input
                type="file"
                name="plant-image"
                id="plant-image"
                className="hidden"
                accept=".png, .jpeg, .jpg"
                onChange={onImageUpload}
                required
              />
            </div>
          </label>

          <div className="mt-4">
            {!imageFile ? (
              <Button disabled className="select-none font-dark">
                Add Image to Proceed
              </Button>
            ) : (
              <div className="flex flex-col justify-center gap-4 items-center">
                <p className="text-sm">{imageFile.name} Uploaded!</p>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                  Detect Disease
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">Error: {error}</p>}

      {data && <Result data={data} />}
    </section>
  )
}
