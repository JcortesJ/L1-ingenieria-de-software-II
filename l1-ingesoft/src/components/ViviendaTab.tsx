'use client'

import { useState, useEffect } from 'react'


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import viviendasData from '@/testdata/dataViviendas'
import ViviendaCard from './ViviendaCard'

interface Vivienda {
  id_vivienda: number
  id_municipio: number
  direccion: string
  tipo: string
  id_cabeza_hogar: number
  nombre_cabeza_hogar: string
  modalidad_ocupacion: string
  esVigente: boolean
}



const ViviendaTab = () => {
  const [viviendas, setViviendas] = useState<Vivienda[]>(viviendasData)
  const [filtro, setFiltro] = useState<'todos' | 'vigentes' | 'no-vigentes'>('todos')
  const [selectedVivienda, setSelectedVivienda] = useState<Vivienda | null>(null)
  

  useEffect(() => {
    switch (filtro) {
      case 'vigentes':
        setViviendas(viviendasData.filter(v => v.esVigente))
        break
      case 'no-vigentes':
        setViviendas(viviendasData.filter(v => !v.esVigente))
        break
      default:
        setViviendas(viviendasData)
    }
  }, [filtro])

  

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-2xl font-bold">Viviendas</h1>
            <p className="text-sm text-gray-600">Historial de viviendas que han sido utilizadas, con la cabeza de familia como la persona que habita como reponsable junto a las demas personas de su circulo, (si se oprime las viviendas se puede ver sus habitantes) </p>
        </div>
        
        <Select onValueChange={(value: 'todos' | 'vigentes' | 'no-vigentes') => setFiltro(value)}>
          <SelectTrigger className="w-[180px] bg-gray-200">
            <SelectValue placeholder="Filtrar por vigencia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="vigentes">Vigentes</SelectItem>
            <SelectItem value="no-vigentes">No vigentes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-row flex-wrap gap-2">
        {viviendas.map((vivienda) => (
          <ViviendaCard
            key={vivienda.id_vivienda}
            vivienda={vivienda}
            
          />
        ))}
      </div>

      
    </div>
  )
}

export default ViviendaTab

