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
  Norte: ["Acre", "Amapa", "Amazonas", "Pará", "Rondônia", "Roraima", "Tocantins"],
  Nordeste: [
    "Alagoas",
    "Bahia",
    "Ceará",
    "Maranhão",
    "Paraíba",
    "Pernambuco",
    "Piauí",
    "Rio Grande Norte",
    "Sergipe",
  ],
  "Centro-Oeste": ["Distrito Federal", "Goias", "Mato Grosso", "Mato Grosso do Sul"],
  Sudeste: ["Espirito Santo", "Minas Gerais", "Rio de Janeiro", "São Paulo"],
  Sul: ["Paraná", "Rio Grande do Sul", "Santa Catarina"],
}

const stateToRegion: { [key: string]: string } = Object.entries(regions).reduce(
  (acc, [region, states]) => {
    states.forEach((state) => {
      acc[state] = region
    })
    return acc
  },
  {} as { [key: string]: string },
)

export function processCSV(file: File): Promise<RegionData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      encoding: "utf-8",
      complete: (results: any) => {
        const data: RegionData = {}
        console.log(data)
        results.data.forEach((row: CSVRow) => {
          const state = row.region
          const quantity = Number(row.value)
          
          if (isNaN(quantity)) return

          const region = stateToRegion[state]
          if (region) {
            if (!data[region]) {
              data[region] = { total: 0 }
            }
            if (!data[region][state]) {
              data[region][state] = 0
            }
            data[region][state] += quantity
            data[region].total += quantity
          }
        })
        Object.entries(regions).forEach(([region, states]) => {
          if (!data[region]) {
            data[region] = { total: 0 }
          }
          states.forEach((state) => {
            if (!data[region][state]) {
              data[region][state] = 0
            }
          })
        })
        console.log(data)
        resolve(data)
      },
      error: (error: any) => {
        reject(error)
      },
    })
  })
}
