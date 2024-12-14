import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, User, Building2 } from 'lucide-react'
import { MunicipioType } from "@/testdata/dataMunicipios"

interface MunicipioCardProps {
  municipio: MunicipioType
}

const MunicipioCard = ({ municipio }: MunicipioCardProps) => {
  return (
    <Card className="w-full max-w-sm bg-gray-100 border-gray-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          {municipio.nombre}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Departamento:</span>
            <span className="font-medium">{municipio.departamento}</span>
          </p>
          <p className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Gobernador:</span>
            <span className="font-medium">{municipio.nombre_gobernador}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default MunicipioCard
