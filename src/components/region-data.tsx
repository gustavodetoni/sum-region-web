import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RegionData {
  [region: string]: {
    [state: string]: number
    total: number
  }
}

interface RegionDataDisplayProps {
  data: RegionData
}

export function RegionDataDisplay({ data }: RegionDataDisplayProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(data).map(([region, regionData]) => (
        <Card key={region}>
          <CardHeader>
            <CardTitle>{region}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {Object.entries(regionData).map(
                ([state, value]) =>
                  state !== "total" && (
                    <li key={state} className="flex justify-between">
                      <span>{state}</span>
                      <span>{value}</span>
                    </li>
                  ),
              )}
            </ul>
            <div className="mt-4 pt-2 border-t flex justify-between font-bold">
              <span>Total</span>
              <span>{new Intl.NumberFormat('pt-BR').format(regionData.total)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

