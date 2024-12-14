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
import { Switch } from "@/components/ui/switch"
import dataPersonas from "@/testdata/dataPersona"

const formSchema = z.object({
    livingStatus: z.enum(["all", "alive", "deceased"]),
    houses: z.enum(["all", "0", "1", "2", "3+"]),
    department: z.string().optional(),
    searchName: z.string().optional(),
    isHeadOfFamily: z.boolean(),
})

const aplicarFiltros = (personas: any, values: any) => {
    const filteredPersonas = personas.filter((persona: any) => {
        // Filtrar por estado de vida
        if (values.livingStatus !== "all" && persona.vivo !== (values.livingStatus === "alive")) return false
        
        // Filtrar por número de casas
        if (values.houses !== "all") {
            if (values.houses === "3+" && persona.numCasas < 3) return false
            if (values.houses !== "3+" && persona.numCasas !== parseInt(values.houses)) return false
        }
        
        // Filtrar por nombre
        if (values.searchName && !persona.nombre.toLowerCase().startsWith(values.searchName.toLowerCase())) return false
        
        // Filtrar por departamento
        if (values.department && persona.departamento && !persona.departamento.toLowerCase().startsWith(values.department.toLowerCase())) return false
        
        // Filtrar solo cabezas de familia
        if (values.isHeadOfFamily && persona.id !== persona.id_cabeza_familia) return false
        
        return true
    })

    return filteredPersonas
}

const PersonaTab = () => {
    const [personas, setPersonas] = useState(dataPersonas)
    const [filteredPersonas, setFilteredPersonas] = useState(dataPersonas)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            livingStatus: "all",
            houses: "all",
            department: "",
            searchName: "",
            isHeadOfFamily: false,
        },
    })

    const applyFilters = (values: z.infer<typeof formSchema>) => {
        const filteredData = aplicarFiltros(dataPersonas, values)
        if (filteredData.length === 0) {
            setError('No se encontraron resultados para los filtros seleccionados')
            setFilteredPersonas([])
        } else {
            setError(null)
            setFilteredPersonas(filteredData)
        }
    }

    // Se aplica el filtro cada vez que un valor en el formulario cambia
    useEffect(() => {
        const values = form.getValues()
        applyFilters(values)
    }, [
        form.watch("livingStatus"),
        form.watch("houses"),
        form.watch("department"),
        form.watch("searchName"),
        form.watch("isHeadOfFamily")
    ])

    return (
        <div className="container mx-auto py-8">
            <Form {...form}>
                <form className="space-y-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                        <FormField
                            control={form.control}
                            name="livingStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Estado</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-gray-200">
                                                <SelectValue placeholder="Seleccionar estado" />
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
                                        <FormControl>
                                            <SelectTrigger className="bg-gray-200">
                                                <SelectValue placeholder="Seleccionar número de casas" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
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
                        <FormField
                            control={form.control}
                            name="searchName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Buscar por nombre</FormLabel>
                                    <FormControl>
                                        <Input className="bg-gray-200" placeholder="Buscar por nombre" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isHeadOfFamily"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center gap-2">
                                    
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel className="font-bold p-0 m-0">Solo Cabezas de Familia</FormLabel>
                                </FormItem>
                            )}
                        />
                    </div>
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
                {filteredPersonas.map((persona, index) => (
                    <PersonaCard persona={persona} key={index} />
                ))}
            </div>
        </div>
    )
}

export default PersonaTab
