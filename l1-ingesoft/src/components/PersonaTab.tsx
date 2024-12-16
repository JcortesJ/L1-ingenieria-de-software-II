"use client";

import { useState, useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import PersonaCard from "./PersonaCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fetchPersonas } from "@/actions/personas";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { PersonaType } from "@/testdata/dataPersona";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormularioModal } from "./FormularioModal";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getInputData } from "@/lib/utils";
import { Switch } from "./ui/switch";
//import { fetchPersonas } from "@/actions/personas";

const formSchema = z.object({
  //livingStatus: z.enum(["all", "alive", "deceased"]),
  houses: z.enum(["all", "0", "1", "2", "3+"]),
  department: z.string().optional(),
  searchName: z.string().optional(),
  isHeadOfFamily: z.boolean(),
});

const aplicarFiltros = (
  personas: PersonaType[],
  values: z.infer<typeof formSchema>
): PersonaType[] => {
  const filteredPersonas = personas.filter((persona: PersonaType) => {
  
    // Filtrar por número de casas
    if (values.houses !== "all") {
      if (values.houses === "3+" && persona.numCasas < 3) return false;
      if (
        values.houses !== "3+" &&
        persona.numCasas !== parseInt(values.houses)
      )
        return false;
    }

    // Filtrar por nombre
    if (
      values.searchName &&
      !persona.nombre.toLowerCase().startsWith(values.searchName.toLowerCase())
    )
      return false;

    // Filtrar por departamento
    if (
      values.department &&
      persona.departamento &&
      !persona.departamento
        .toLowerCase()
        .startsWith(values.department.toLowerCase())
    )
      return false;

    //Filtrar solo cabezas de familia
    if (values.isHeadOfFamily && persona.id !== persona.id_cabeza_familia)
      return false;

    return true;
  });

  return filteredPersonas;
};

const PersonaTab = () => {
  const [filteredPersonas, setFilteredPersonas] = useState<PersonaType[]>([]);
  const [personas, setPersonas] = useState<PersonaType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      houses: "all",
      department: "",
      searchName: "",
      isHeadOfFamily: false,
    },
  });



  useEffect(() => {
    //simulacion primea consulta a la APi
    const loadData = async () => {
      setIsLoading(true); // Marca como cargando
      const { data, error } = await fetchPersonas(); // Llama a la función fetch

      if (error) {
        setError(error); // Si hay un error, actualiza el estado de error
      } else {
        setError(null) // Restablecer el error si no hay error
        setPersonas(data); // Si no hay error, actualiza el estado con los datos
        console.log(personas);
      }
      setIsLoading(false);
    };
    loadData();

    //setFilteredPersonas(dataPersonas);
  }, []);
  const applyFilters = useCallback((values: z.infer<typeof formSchema>) => {
    if (!personas.length) return; // Evitar aplicar filtros cuando no hay datos

    const filteredData = aplicarFiltros(personas, values);
    if (filteredData.length === 0) {
      setError("No se encontraron resultados para los filtros seleccionados");
      setFilteredPersonas([]);
    } else {
      setError(null);
      setFilteredPersonas(filteredData);
    }
  }, [personas]);
  // Se aplica el filtro cada vez que un valor en el formulario cambia
  // Se aplica el filtro cada vez que un valor en el formulario cambia
  const houses = form.watch("houses");
  const department = form.watch("department");
  const searchName = form.watch("searchName");
  const isHeadOfFamily = form.watch("isHeadOfFamily");

  useEffect(() => {
    if (!isLoading) {
      const values = form.getValues();
      applyFilters(values);
    }

  }, [
    houses,
    department,
    searchName,
    isHeadOfFamily,
    form,
    applyFilters,
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSubmit(data: Record<string, any>): void {
    console.log(data);
  }
  return (
    <div className="container mx-auto py-8">
      <Form {...form}>
        <form className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            
            <FormField
              control={form.control}
              name="houses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Número de casas</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                  <FormLabel className="font-bold">
                    Departamento (opcional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-200"
                      placeholder="Ingrese el departamento"
                      {...field}
                    />
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
                    <Input
                      className="bg-gray-200"
                      placeholder="Buscar por nombre"
                      {...field}
                    />
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
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-bold p-0 m-0">
                    Solo Cabezas de Familia
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormularioModal
              className="w-full md:w-[180px] bg-[#658567] border-none hover:bg-[#658567]/90 hover:text-white"
              name="Crear Persona"
              title="Por favor ingrese los datos de la persona"
              inputs={getInputData("person")}
              onSubmit={handleSubmit}
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
  );
};

export default PersonaTab;
