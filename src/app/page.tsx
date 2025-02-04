'use client'

import { useState } from 'react'
import { CSVUploader } from '@/components/csv-uploader'
import { RegionDataDisplay } from '@/components/region-data'
import { processCSV } from '@/utils/process-csv'
import { Header } from '@/components/header'

export default function Home() {
  const [regionData, setRegionData] = useState<any>(null)

  const handleFileUpload = async (file: File) => {
    try {
      const data = await processCSV(file)
      setRegionData(data)
    } catch (error) {
      console.error('Erro ao processar o arquivo CSV:', error)
      //adicionar um toast de erro
    }
  }

  return (
    <div>
       <Header />
    <main className="container mx-auto p-4">
      <CSVUploader onFileUpload={handleFileUpload} />
      {regionData && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Dados por Região</h2>
          <RegionDataDisplay data={regionData} />
        </div>
      )}
    </main>
    </div>
  )
}
