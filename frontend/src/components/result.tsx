// import { Prediction } from "@/lib/types"

// interface ResultProps {
//   data: Prediction
// }

// export default function Result({ data }: ResultProps) {
//   console.log(data)
//   const prediction = data.result
//   return (
//     <div className="w-screen mt-8">
//       {/* If the image is not a plant just show one line */}
//       {prediction.is_plant.binary ? (
//         <div className="p-8 bg-secondary">
//           <p className="text-center text-3xl md:text-4xl">
//             Plant is{"  "}
//             <span className="font-bold">
//               {prediction.is_healthy.binary ? (
//                 <span className="gradient-text">Healthy</span>
//               ) : (
//                 <span className="text-red-500">Unhealthy</span>
//               )}
//             </span>
//           </p>
//           {/* If the plant is healthy display a motivated message :) */}
//           {prediction.is_healthy.binary && (
//             <p className="text-center mt-4 text-lg">
//               Your plant is happy, you are truly a nature lover!
//             </p>
//           )}
//           {/* If the plant is unhealthy then only display the diseases */}
//           {!prediction.is_healthy.binary && (
//             <div>
//               <p className="text-center text-lg md:text-2xl mt-8">
//                 Potential Diseases
//               </p>
//               <div
//                 className={`${
//                   prediction.disease.suggestions.length === 1
//                     ? ""
//                     : "md:grid-cols-1"
//                 } grid gap-6 place-content-center`}
//               >
//                 {prediction.disease.suggestions.map((disease) => (
//                   <div
//                     className="mt-4 text-center grid md:grid-cols-2 place-items-center gap-4"
//                     key={disease.id}
//                   >
//                     <div className="">
//                       <div className="flex items-center justify-center">
//                         <p className="text-2xl font-bold">
//                           {disease.name}:{" "}
//                           {(disease.probability * 100).toPrecision(7)}%
//                         </p>
//                       </div>
//                       <p className="my-2">Plants with {disease.name}</p>
//                       <div className="flex gap-2">
//                         {disease.similar_images.map((image) => (
//                           <div key={image.id}>
//                             {/* eslint-disable-next-line @next/next/no-img-element */}
//                             <img
//                               src={image.url}
//                               alt={image.citation}
//                               className="rounded-md"
//                             />
//                             <p className="my-4">
//                               Similarity:{" "}
//                               <span className="font-bold">
//                                 {(image.similarity * 100).toPrecision(4)}%
//                               </span>
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="flex flex-col gap-4">
//                       <div>
//                         <h3 className="text-center font-bold text-xl mb-1">
//                           Description
//                         </h3>
//                         <p className="text-justify">
//                           {disease.details.description}
//                         </p>
//                       </div>
//                       <div>
//                         <h3 className="text-center font-bold text-xl mb-1">
//                           Treatment
//                         </h3>
//                         <div className="text-justify flex flex-col gap-2">
//                           <p>
//                             <span className="font-bold">Chemical:</span>{" "}
//                             {disease.details.treatment.chemical}
//                           </p>
//                           <p>
//                             <span className="font-bold">Biological:</span>{" "}
//                             {disease.details.treatment.biological}
//                           </p>
//                         </div>
//                       </div>
//                       <div>
//                         <h3 className="text-center font-bold text-xl mb-1">
//                           Prevention
//                         </h3>
//                         <p className="text-justify">
//                           {disease.details.treatment.prevention}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="text-center">
//           <p className="text-2xl">Image is not a Plant</p>
//           <p className="text-red-500 mt-1 text-lg">
//             Please put the correct image and retry!
//           </p>
//         </div>
//       )}
//     </div>
//   )
// }

interface ResultProps {
  data: {
    plant: string
    disease: string
    accuracy?: string
    description?: string
    treatment?: {
      chemical?: string
      biological?: string
      prevention?: string
    }
    remedy: string
    source?: string
  }
}

export default function Result({ data }: ResultProps) {
  const { plant, disease, accuracy, description, treatment, remedy, source } = data

  const isHealthy = disease.toLowerCase().includes("healthy")

  return (
    <div className="w-screen mt-8 p-6 bg-secondary text-center">
      <p className="text-2xl md:text-4xl">
        Detected Plant: <span className="font-bold">{plant}</span>
      </p>

      <p className="text-xl mt-4">
        Health Status:{" "}
        <span className={isHealthy ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
          {isHealthy ? "Healthy" : "Unhealthy"}
        </span>
      </p>

      {!isHealthy && (
        <>
          <p className="text-xl mt-4">
            Disease: <strong>{disease}</strong>
          </p>

          {accuracy && (
             <p className="text-lg mt-1 text-black font-bold">

           Accuracy: {accuracy}
            </p>

          )}

          {description && (
            <div className="mt-4 text-justify">
              <h3 className="font-semibold text-lg">Description</h3>
              <p>{description}</p>
            </div>
          )}

          {treatment && (
            <div className="mt-4 text-justify">
              <h3 className="font-semibold text-lg">Treatment</h3>
              <ul className="list-disc list-inside text-left">
                {treatment.chemical && (
                  <li>
                    <strong>Chemical:</strong> {treatment.chemical}
                  </li>
                )}
                {treatment.biological && (
                  <li>
                    <strong>Biological:</strong> {treatment.biological}
                  </li>
                )}
                {treatment.prevention && (
                  <li>
                    <strong>Prevention:</strong> {treatment.prevention}
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="mt-4">
            <p className="text-md">
              <strong>Remedy:</strong> {remedy}
            </p>
          </div>
        </>
      )}

      {isHealthy && (
        <p className="text-md mt-4 text-green-700">
          Your plant is happy and does not need any treatment! 🌱
        </p>
      )}
    </div>
  )
}

