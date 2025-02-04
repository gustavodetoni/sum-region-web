"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Upload } from "lucide-react"

interface CSVUploaderProps {
  onFileUpload: (file: File) => void
}

export function CSVUploader({ onFileUpload }: CSVUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0])
      }
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  })

  return (
    <Card>
      <CardContent>
        <div
          {...getRootProps()}
          className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Solte o arquivo CSV aqui...</p>
          ) : (
            <div>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p>Arraste e solte um arquivo CSV aqui, ou clique para selecionar</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

