"use client";


import {  useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import MunicipioCard from "./MunicipioCard"
import dataMunicipios, { MunicipioType } from "@/testdata/dataMunicipios"
import dataPersonas, { PersonaType } from "@/testdata/dataPersona"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fetchMunicipios, cambiarAlcalde } from "@/actions/municipios"
import { ModalCambiarAlcalde } from "./ModalCambiarAlcade"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fetchPersonas } from "@/actions/personas"

const MunicipioTab = () => {
    const [municipios, setMunicipios] = useState<MunicipioType[]>([])
    const [filteredMunicipios, setFilteredMunicipios] = useState<MunicipioType[]>([])
    const [departamentoFilter, setDepartamentoFilter] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [personas, setPersonas] = useState<PersonaType[]>([])
    const [selectedMunicipio, setSelectedMunicipio] = useState<MunicipioType | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        // const loadData = async () => {
        //     try {
        //         const { data: municipiosData, error: municipiosError } = await fetchMunicipios()
        //         if (municipiosError) {
        //             setError(municipiosError)
        //         } else {
        //             setMunicipios(municipiosData)
        //             setFilteredMunicipios(municipiosData)
        //         }

        //         const { data: personasData, error: personasError } = await fetchPersonas()
        //         if (personasError) {
        //             console.error("Error fetching personas:", personasError)
        //         } else {
        //             setPersonas(personasData)
        //         }
        //     } catch (error) {
        //         console.error("Error loading data:", error)
        //         setError("Hubo un error al cargar los datos. Por favor, intente de nuevo más tarde.")
        //     }
        // }

        // loadData()
        setMunicipios(dataMunicipios)
        setFilteredMunicipios(dataMunicipios)
        
        
    }, [])

    useEffect(() => {
        setPersonas(dataPersonas)
        console.log("PErsonas data ", dataPersonas)
        console.log("PErsonas en tab ", personas)
    }, [])


  useEffect(() => {
    const filtered = municipios.filter((municipio) =>
      municipio.departamento
        .toLowerCase()
        .startsWith(departamentoFilter.toLowerCase())
    );

    // Si no hay resultados, establecer el error, sino, resetear el error
    if (filtered.length === 0 && departamentoFilter !== "") {
      setError(
        "No se encontraron municipios que coincidan con el filtro de departamento."
      );
    } else {
      setError(null); // Restablecer el error si hay resultados
    }

    setFilteredMunicipios(filtered); // Actualiza los municipios filtrados
  }, [departamentoFilter, municipios]);


        if (filtered.length === 0 && departamentoFilter !== "") {
            setError("No se encontraron municipios que coincidan con el filtro de departamento.")
        } else {
            setError(null)
        }

        setFilteredMunicipios(filtered)
    }, [departamentoFilter, municipios])

    const handleOpenModal = (municipio: MunicipioType) => {
        console.log("Abriendo modal para:", municipio.nombre)
        setSelectedMunicipio(municipio)
        setIsModalOpen(true)
    }

    const handleCambiarAlcalde = async (nuevoAlcaldeId: number) => {
        if (!selectedMunicipio) return

        try {
            await cambiarAlcalde(selectedMunicipio.id_municipio, nuevoAlcaldeId)
            const nuevoAlcalde = personas.find(p => p.id === nuevoAlcaldeId)
            if (nuevoAlcalde) {
                setMunicipios(prevMunicipios => 
                    prevMunicipios.map(m => 
                        m.id_municipio === selectedMunicipio.id_municipio 
                            ? {...m, nombre_gobernador: nuevoAlcalde.nombre, id_gobernador: nuevoAlcalde.id}
                            : m
                    )
                )
                toast({
                    title: "Alcalde actualizado",
                    description: `El nuevo alcalde de ${selectedMunicipio.nombre} es ${nuevoAlcalde.nombre}`,
                    duration: 3000,
                })
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo actualizar el alcalde",
                variant: "destructive",
                duration: 3000,
            })
        }
        setIsModalOpen(false)
    }

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

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            )}

            {filteredMunicipios.length > 0 && !error ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredMunicipios.map((municipio) => (
                        <MunicipioCard 
                            key={municipio.id_municipio} 
                            municipio={municipio} 
                            onCambiarAlcalde={() => handleOpenModal(municipio)}
                        />
                    ))}
                </div>
            ) : null}
            {selectedMunicipio &&
                <ModalCambiarAlcalde
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCambiarAlcalde={handleCambiarAlcalde}
                municipio={selectedMunicipio}
                personas={personas}
            />
            }

        </div>
      ) : null}
    </div>
  );
};


export default MunicipioTab


