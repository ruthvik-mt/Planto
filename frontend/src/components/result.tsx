import { Suggestion } from "@/lib/types"

interface ResultProps {
  data: {
    custom: {
      plant: string
      disease: string
      confidence: string
      remedy: string | string[]
      source: string
    }
    plantid?: {
      plant?: string
      suggestions?: Suggestion[]
    }
  }
}

export default function Result({ data }: ResultProps) {
  const { custom, plantid } = data

  return (
    <div className="mt-8 space-y-10">
      {/* Smart Scan Result */}
      <div className="p-6 rounded-lg border bg-white dark:bg-zinc-900 shadow-md ">
        <h2 className="text-2xl font-bold mb-4 text-center">Smart Scan Result</h2>

        <div className="text-left space-y-2">
          <p><strong>Plant:</strong> {custom.plant}</p>
          <p><strong>Disease:</strong> {custom.disease}</p>
          <p><strong>Confidence:</strong> {custom.confidence}</p>

          <div>
            <p><strong>Remedy:</strong></p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {Array.isArray(custom.remedy) ? (
                custom.remedy.map((point, i) => <li key={i}>{point}</li>)
              ) : (
                <li>{custom.remedy}</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Deep Scan Result */}
      {plantid?.suggestions && plantid.suggestions.length > 0 && (
        <div className="p-6 rounded-lg border bg-white dark:bg-zinc-900 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Deep Scan Result</h2>

          <div className="text-left space-y-6">
            {plantid.suggestions.map((sug) => (
              <div key={sug.id} className="pt-4 border-t space-y-3">
                <p><strong>Disease:</strong> {sug.name}</p>
                <p><strong>Confidence:</strong> {(sug.probability * 100).toFixed(2)}%</p>
                <p><strong>Description:</strong> {sug.details.description}</p>

                <div className="space-y-1">
                  <p><strong>Treatment:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    {sug.details.treatment.chemical?.map((c, i) => (
                      <li key={`chem-${i}`}>Chemical: {c}</li>
                    ))}
                    {sug.details.treatment.biological?.map((b, i) => (
                      <li key={`bio-${i}`}>Biological: {b}</li>
                    ))}
                    {sug.details.treatment.prevention?.map((p, i) => (
                      <li key={`prev-${i}`}>Prevention: {p}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {sug.similar_images.map((img) => (
                    <div key={img.id}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={img.citation ?? "similar image"}
                        className="rounded-lg w-full object-cover"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Similarity: {(img.similarity * 100).toFixed(2)}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
// <div className="text-center text-sm text-gray-500 italic">
//    No disease detected by Plant.id
// </div> 
