'use client'
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import MunicipioCard from "./MunicipioCard"
import dataMunicipios, { MunicipioType } from "@/testdata/dataMunicipios"

const MunicipioTab = () => {
  const [municipios, setMunicipios] = useState<MunicipioType[]>([])
  const [filteredMunicipios, setFilteredMunicipios] = useState<MunicipioType[]>([])
  const [departamentoFilter, setDepartamentoFilter] = useState("")

  useEffect(() => {
    // Simulación de consulta a la API
    setMunicipios(dataMunicipios)
    setFilteredMunicipios(dataMunicipios)
  }, [])

  useEffect(() => {
    const filtered = municipios.filter((municipio) =>
      municipio.departamento.toLowerCase().startsWith(departamentoFilter.toLowerCase())
    )
    setFilteredMunicipios(filtered)
  }, [departamentoFilter, municipios])

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Municipios</h1>
          <p className="text-sm text-gray-600">
            Municipios, con su gobernador
          </p>
        </div>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Filtrar por departamento"
          value={departamentoFilter}
          onChange={(e) => setDepartamentoFilter(e.target.value)}
          className="max-w-sm bg-gray-200"
        />
      </div>
      {filteredMunicipios.length === 0 ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No se encontraron resultados</AlertTitle>
          <AlertDescription>
            No se encontraron municipios que coincidan con el filtro de departamento.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMunicipios.map((municipio) => (
            <MunicipioCard key={municipio.id_municipio} municipio={municipio} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MunicipioTab

