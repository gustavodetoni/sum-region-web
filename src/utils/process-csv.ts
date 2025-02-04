import Papa from "papaparse"

interface CSVRow {
  region: string
  value: string
}

interface RegionData {
  [region: string]: {
    [state: string]: number
    total: number
  }
}

const regions: { [key: string]: string[] } = {
  Norte: ["Acre", "Amapá", "Amazonas", "Pará", "Rondônia", "Roraima", "Tocantins"],
  Nordeste: [
    "Alagoas",
    "Bahia",
    "Ceará",
    "Maranhão",
    "Paraíba",
    "Pernambuco",
    "Piauí",
    "Rio Grande do Norte",
    "Sergipe",
  ],
  "Centro-Oeste": ["Distrito Federal", "Goiás", "Mato Grosso", "Mato Grosso do Sul"],
  Sudeste: ["Espírito Santo", "Minas Gerais", "Rio de Janeiro", "São Paulo"],
  Sul: ["Paraná", "Rio Grande do Sul", "Santa Catarina"],
}

export function processCSV(file: File): Promise<RegionData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results : any) => {
        const data: RegionData = {}

        results.data.forEach((row: CSVRow) => {
          const state = row.region
          const value = Number(row.value)

          if (isNaN(value)) return

          for (const [region, states] of Object.entries(regions)) {
            if (states.includes(state)) {
              if (!data[region]) {
                data[region] = { total: 0 }
              }
              if (!data[region][state]) {
                data[region][state] = 0
              }
              data[region][state] += value
              data[region].total += value
              break
            }
          }
        })

        resolve(data)
      },
      error: (error : any) => {
        reject(error)
      },
    })
  })
}

