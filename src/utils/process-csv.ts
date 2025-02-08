import Papa from 'papaparse'

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

const stateAbbreviations: { [key: string]: string } = {
  Acre: 'AC',
  Amapa: 'AP',
  Amazonas: 'AM',
  Para: 'PA',
  Rondonia: 'RO',
  Roraima: 'RR',
  Tocantins: 'TO',
  Alagoas: 'AL',
  Bahia: 'BA',
  Ceara: 'CE',
  Maranhao: 'MA',
  Paraiba: 'PB',
  Pernambuco: 'PE',
  Piaui: 'PI',
  'Rio Grande Norte': 'RN',
  Sergipe: 'SE',
  'Distrito Federal': 'DF',
  Goias: 'GO',
  'Mato Grosso': 'MT',
  'Mato Grosso do Sul': 'MS',
  'Espirito Santo': 'ES',
  'Minas Gerais': 'MG',
  'Rio de Janeiro': 'RJ',
  'Sao Paulo': 'SP',
  Parana: 'PR',
  'Rio Grande do Sul': 'RS',
  'Santa Catarina': 'SC',
}

const regions: { [key: string]: string[] } = {
  Norte: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
  Nordeste: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
  'Centro-Oeste': ['DF', 'GO', 'MT', 'MS'],
  Sudeste: ['ES', 'MG', 'RJ', 'SP'],
  Sul: ['PR', 'RS', 'SC'],
}

const stateToRegion: { [key: string]: string } = Object.entries(regions).reduce(
  (acc, [region, states]) => {
    states.forEach((state) => {
      acc[state] = region
    })
    return acc
  },
  {} as { [key: string]: string }
)

export function processCSV(file: File): Promise<RegionData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      encoding: 'utf-8',
      complete: (results: any) => {
        const data: RegionData = {}

        results.data.forEach((row: CSVRow) => {
          const stateFullName = row.region
          const quantity = Number(row.value)

          if (isNaN(quantity)) return

          const stateAbbr = stateAbbreviations[stateFullName]
          if (!stateAbbr) return

          const region = stateToRegion[stateAbbr]
          if (region) {
            if (!data[region]) {
              data[region] = { total: 0 }
            }
            if (!data[region][stateAbbr]) {
              data[region][stateAbbr] = 0
            }
            data[region][stateAbbr] += quantity
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
