"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import DepartamentoCard from "@/components/DepartamentoCard" // Componente similar al MunicipioCard
import dataDepartamentos, { DepartamentoType } from "@/testdata/dataDepartamento"

const DepartamentoTab = () => {
  const [departamentos, setDepartamentos] = useState<DepartamentoType[]>([])
  const [filteredDepartamentos, setFilteredDepartamentos] = useState<DepartamentoType[]>([])
  const [nombreFilter, setNombreFilter] = useState("")

  useEffect(() => {
    // Simulación de consulta a la API
    setDepartamentos(dataDepartamentos)
    setFilteredDepartamentos(dataDepartamentos)
  }, [])

  useEffect(() => {
    const filtered = departamentos.filter((departamento) =>
      departamento.nombre.toLowerCase().startsWith(nombreFilter.toLowerCase())
    )
    setFilteredDepartamentos(filtered)
  }, [nombreFilter, departamentos])

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Departamentos</h1>
          <p className="text-sm text-gray-600">
            Departamentos y su información relevante
          </p>
        </div>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Filtrar por nombre del departamento"
          value={nombreFilter}
          onChange={(e) => setNombreFilter(e.target.value)}
          className="max-w-sm bg-gray-200"
        />
      </div>
      {filteredDepartamentos.length === 0 ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No se encontraron resultados</AlertTitle>
          <AlertDescription>
            No se encontraron departamentos que coincidan con el filtro aplicado.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredDepartamentos.map((departamento) => (
            <DepartamentoCard key={departamento.id_departamento} departamento={departamento} />
          ))}
        </div>
      )}
    </div>
  )
}

export default DepartamentoTab
