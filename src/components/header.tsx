import { FileSpreadsheet } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-orange-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center">
        <FileSpreadsheet className="mr-2 h-6 w-6" />
        <h1 className="text-2xl font-bold">Processador de Região</h1>
      </div>
    </header>
  )
}
