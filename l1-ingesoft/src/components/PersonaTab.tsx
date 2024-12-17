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

import { createPersona, fetchPersonas } from "@/actions/personas";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CircleUserRound } from "lucide-react";
import { PersonaType } from "@/testdata/dataPersona";
import { FormularioModal } from "./FormularioModal";
import { getInputData } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { AnimatedCard } from "./ui/AnimatedCard";
import { Skeleton } from "./ui/skeleton";

const formSchema = z.object({
  houses: z.enum(["all", "0", "1", "2", "3+"]),
  department: z.string().optional(),
  searchName: z.string().optional(),
  isCdf: z.boolean(),
});

const aplicarFiltros = (
  personas: PersonaType[],
  values: z.infer<typeof formSchema>
): PersonaType[] => {
  const filteredPersonas = personas.filter((persona: PersonaType) => {
    if (values.houses !== "all") {
      if (values.houses === "3+" && persona.numCasas < 3) return false;
      if (
        values.houses !== "3+" &&
        persona.numCasas !== parseInt(values.houses)
      )
        return false;
    }

    if (
      values.searchName &&
      !persona.nombre.toLowerCase().startsWith(values.searchName.toLowerCase())
    )
      return false;

    if (
      values.department &&
      persona.departamento &&
      !persona.departamento
        .toLowerCase()
        .startsWith(values.department.toLowerCase())
    )
      return false;

    if (values.isCdf && !persona.isCdf) return false;

    return true;
  });

  return filteredPersonas;
};

const PersonaTab = () => {
  const [filteredPersonas, setFilteredPersonas] = useState<PersonaType[]>([]);
  const [personas, setPersonas] = useState<PersonaType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formInputs, setFormInputs] = useState([]);
  const [isInputsLoading, setIsInputsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      houses: "all",
      department: "",
      searchName: "",
      isCdf: false,
    },
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const { data, error } = await fetchPersonas();

      if (error) {
        setError(error);
      } else {
        setError(null);
        setPersonas(data);
        console.log(personas);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadInputs = async () => {
      setIsInputsLoading(true);
      const inputs = await getInputData("person");
      setFormInputs(inputs);
      setIsInputsLoading(false);
    };
    loadInputs();
  }, []);

  const applyFilters = useCallback(
    (values: z.infer<typeof formSchema>) => {
      if (!personas.length) return;

      const filteredData = aplicarFiltros(personas, values);
      if (filteredData.length === 0) {
        setError("No se encontraron resultados para los filtros seleccionados");
        setFilteredPersonas([]);
      } else {
        setError(null);
        setFilteredPersonas(filteredData);
      }
    },
    [personas]
  );

  const houses = form.watch("houses");
  const department = form.watch("department");
  const searchName = form.watch("searchName");
  const isHeadOfFamily = form.watch("isCdf");

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
    isLoading,
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(dataSubmit: Record<string, any>): Promise<void> {
    const {
      esCabezaFamilia,
      fechaFinOcupacion,
      fechaInicioOcupacion,
      fechaNacimiento,
      genero,
      idVivienda,
      modalidadOcupacion,
      nombre,
      idCabezaFamilia,
    } = dataSubmit;
    const personaData = {
      fechaNacimiento: fechaNacimiento,
      nombre: nombre,
      isCdf: Boolean(esCabezaFamilia),
      genero: genero.toUpperCase(),
      ...(!esCabezaFamilia && { idCabezaFamilia: idCabezaFamilia }),
      ...(idVivienda && { idVivienda: Number(idVivienda) }),
      ...(modalidadOcupacion && { modalidadOcupacion: modalidadOcupacion }),
      ...(fechaInicioOcupacion && { fechaInicio: fechaInicioOcupacion }),
      ...(fechaFinOcupacion && { fechaFin: fechaFinOcupacion }),
    };

    console.log(personaData);
    const { data, error } = await createPersona(personaData);
    if (error) {
      setError(error);
    } else {
      setError(null);
      console.log(data);
      setPersonas((prevPersonas) => [...prevPersonas, personaData]);
    }
  }

  const updatePersonaInList = useCallback(
    (updatedPersona: PersonaType) => {
      setPersonas((prevPersonas) =>
        prevPersonas.map((p) =>
          p.id === updatedPersona.id ? updatedPersona : p
        )
      );
      applyFilters(form.getValues());
    },
    [applyFilters, form]
  );

  return (
    <div className="container mx-auto py-8">
      <Form {...form}>
        <form className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
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
              name="isCdf"
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
            {!isInputsLoading && formInputs.length > 0 ? (
              <FormularioModal
                className="w-full md:w-[180px] bg-[#658567] border-none hover:bg-[#658567]/90 hover:text-white"
                name="Crear Persona"
                title="Por favor ingrese los datos de la persona"
                inputs={formInputs}
                onSubmit={handleSubmit}
              />
            ) : (
              <Skeleton className="h-10 w-100vw" />
            )}
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
        {isLoading
          ? [...Array(3)].map((_, index) => (
              <AnimatedCard key={index}>
                <div className="flex flex-col items-center mb-4">
                  <CircleUserRound className="w-10 h-10 stroke-primary mb-2" />
                  <h2
                    className="text-lg font-bold text-center truncate w-full"
                    title={"persona"}
                  >
                    persona
                  </h2>
                </div>
                <Skeleton className="h-10 w-100vw" />
                <Skeleton className="h-10 w-100vw" />
                <Skeleton className="h-10 w-100vw" />
                <p>Cargando...</p>
              </AnimatedCard>
            ))
          : filteredPersonas.map((persona, index) => (
              <PersonaCard
                persona={persona}
                key={index}
                onUpdate={updatePersonaInList}
              />
            ))}
      </div>
    </div>
  );
};

export default PersonaTab;
