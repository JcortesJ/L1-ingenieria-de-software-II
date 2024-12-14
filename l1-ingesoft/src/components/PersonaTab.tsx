'use client'

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import * as z from "zod"
import PersonaCard from "./PersonaCard"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import dataPersonas from "@/testdata/dataPersona"

const formSchema = z.object({
    livingStatus: z.enum(["all", "alive", "deceased"]),
    houses: z.enum(["all", "0", "1", "2", "3+"]),
    department: z.string().optional(),
})
const getPersonasDepartamento = async () => { }

const aplicarFiltros = (personas: any, values: any) => {
    const filteredPersonas = personas.filter((persona: any) => {
        if (values.livingStatus !== "all" && persona.vivo !== (values.livingStatus === "alive")) return false
        if (values.houses !== "all") {
            if (values.houses === "3+" && persona.numCasas < 3) return false
            if (values.houses !== "3+" && persona.numCasas !== parseInt(values.houses)) return false
        }
        return true
    })

    return filteredPersonas
}
const PersonaTab = () => {
    const [personas, setPersonas] = useState(dataPersonas)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            livingStatus: "all",
            houses: "all",
            department: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        setIsLoading(true)
        setError(null)
        try {
            // Datos mock
            if (values.department) {
                const mockData = [
                    {
                        nombre: "Juan Pérez",
                        fecha_nacimiento: "15/05/1985",
                        vivo: true,
                        numCasas: 2,
                        departamento: "Antioquia",
                        municipio: "Medellín"
                    },
                    {
                        nombre: "María García",
                        fecha_nacimiento: "22/11/1990",
                        vivo: true,
                        numCasas: 1,
                        departamento: "Cundinamarca",
                        municipio: "Bogotá"
                    },
                    {
                        nombre: "Carlos Rodríguez",
                        fecha_nacimiento: "03/08/1978",
                        vivo: false,
                        numCasas: 3,
                        departamento: "Valle del Cauca",
                        municipio: "Cali"
                    },
                    {
                        nombre: "Ana Martínez",
                        fecha_nacimiento: "10/12/1995",
                        vivo: true,
                        numCasas: 0,
                        departamento: "Antioquia",
                        municipio: "Envigado"
                    }
                ]
                let personasFiltradas = aplicarFiltros(mockData, values)
                if (personasFiltradas.length === 0) {
                    setError('No se encontraron resultados para los filtros seleccionados')
                    setPersonas([])
                } else {
                    setPersonas(personasFiltradas)
                }

            } else {
                // Aplicar filtros locales
                let filteredPersonas = aplicarFiltros(dataPersonas, values)
                console.log(filteredPersonas.length)
                console.log("aplique los filtros correctamente ")
                if (filteredPersonas.length === 0) {
                    setError('No se encontraron resultados para los filtros seleccionados')
                    setPersonas([])
                } else {
                    setPersonas(filteredPersonas)
                }

            }



            // Código para consultar la API (comentado para uso futuro)
            /*
            const response = await fetch(`/api/personas?department=${encodeURIComponent(values.department || '')}`)
            if (!response.ok) {
              throw new Error('Error al obtener los datos')
            }
            const data = await response.json()
            setPersonas(data)
            */

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ha ocurrido un error')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                        <FormField
                            control={form.control}
                            name="livingStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Estado</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-gray-200">
                                                <SelectValue  placeholder="Seleccionar estado" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="all">Todos</SelectItem>
                                            <SelectItem value="alive">Vivos</SelectItem>
                                            <SelectItem value="deceased">Fallecidos</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="houses"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Número de casas</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl  >
                                            <SelectTrigger className="bg-gray-200">
                                                <SelectValue placeholder="Seleccionar número de casas" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            <SelectItem value="all">Todos</SelectItem>
                                            <SelectItem value="0">0</SelectItem>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3+">3 o más</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Departamento (opcional)</FormLabel>
                                    <FormControl>
                                        <Input className="bg-gray-200" placeholder="Ingrese el departamento" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        
                    </div>
                    <Button type="submit" className="w-60 justify-self-center bg-[#546057]" disabled={isLoading}>
                            {isLoading ? 'Cargando...' : 'Buscar personas'}
                    </Button>

                </form>
            </Form>

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="flex flex-row flex-wrap gap-2">
                {personas.map((persona, index) => (
                    <PersonaCard persona={persona} key={index} />
                ))}
            </div>
        </div>
    )
}

export default PersonaTab

