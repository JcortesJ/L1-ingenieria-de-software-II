"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createVivienda, fetchViviendas } from "@/actions/vivienda";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import viviendasData, { ViviendaType } from "@/testdata/dataViviendas";
import ViviendaCard from "./ViviendaCard";
//import { fetchViviendas } from '@/actions/vivienda'
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"; // Importa el componente de alerta
import { FormularioModal } from "./FormularioModal";
import { getInputData } from "@/lib/utils";
const ViviendaTab = () => {
  const [viviendas, setViviendas] = useState<ViviendaType[]>([]);
  const [filtro, setFiltro] = useState<"todos" | "vigentes" | "no-vigentes">(
    "todos"
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    switch (filtro) {
      case "vigentes":
        setViviendas(viviendasData.filter((v) => v.esVigente));
        break;
      case "no-vigentes":
        setViviendas(viviendasData.filter((v) => !v.esVigente));
        break;
      default:
        setViviendas(viviendasData);
    }
  }, [filtro]);

  useEffect(() => {
    // Simulación de consulta a la API
    // const loadData = async () => {
    //     const { data, error } = await fetchViviendas(); // Llama a la función fetch

    //     if (error) {
    //       setError(error); // Si hay un error, actualiza el estado de error
    //     } else {
    //       setError(null) // Restablecer el error si no hay error
    //       setViviendas(data); // Si no hay error, actualiza el estado con los datos
    //     }
    //   };

    // loadData()
    setViviendas(viviendasData);
  }, []);

  // Condición para mostrar alerta: Si hay error o no hay viviendas disponibles
  const showErrorAlert = error || viviendas.length === 0;

  // Determina el mensaje y el tipo de alerta dependiendo del error o la cantidad de viviendas
  const alertMessage = error
    ? "Hubo un problema al obtener los datos."
    : "No se encontraron viviendas con ese filtro.";
  const alertTitle = error ? "Error al cargar las viviendas" : "Sin resultados";
  const alertVariant = error ? "destructive" : "default"; // Rojo para error, amarillo para sin resultados

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(dataVivienda: any): Promise<void> {
    const { direccion, tipoVivienda, idMunicipio, idPersona } = dataVivienda;
    const viviendaData = {
      direccion: direccion,
      tipo: tipoVivienda,
      idMunicipio: Number(idMunicipio),
      idPersona: Number(idPersona),
    };
    const { error } = await createVivienda(viviendaData);
    if (error) {
      setError(error);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-start justify-between mb-6 flex-col ">
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold">Viviendas</h1>
          <p className="text-sm text-gray-600">
            Historial de viviendas que han sido utilizadas, con la cabeza de
            familia como la persona que habita como responsable junto a las
            demás personas de su círculo. (Si se oprime las viviendas se puede
            ver sus habitantes)
          </p>
        </div>

        <section className="mt-5 flex flex-col md:flex-row items-start gap-2 w-full md:w-auto">
          <Select
            onValueChange={(value: "todos" | "vigentes" | "no-vigentes") =>
              setFiltro(value)
            }
          >
            <SelectTrigger className="w-full md:w-[180px] bg-gray-200">
              <SelectValue placeholder="Filtrar por vigencia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="vigentes">Vigentes</SelectItem>
              <SelectItem value="no-vigentes">No vigentes</SelectItem>
            </SelectContent>
          </Select>
          <FormularioModal
            className="w-full md:w-[180px] bg-gray-200"
            title="Agregar Vivienda"
            name="Agregar Vivienda"
            inputs={getInputData("vivienda")}
            onSubmit={handleSubmit}
          />
          <FormularioModal
            className="w-full md:w-[180px] bg-destructive border-none hover:bg-destructive/90 hover:text-white"
            title="Eliminar Vivienda"
            name="Eliminar Vivienda"
            inputs={getInputData("delete")}
            onSubmit={handleSubmit}
          />
        </section>
      </div>

      {/* Muestra la alerta si hay un error o si no hay viviendas disponibles */}
      {showErrorAlert && (
        <Alert variant={alertVariant ?? null}>
          <AlertTitle>{alertTitle}</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-row flex-wrap gap-2">
        {viviendas.map((vivienda) => (
          <ViviendaCard key={vivienda.id_vivienda} vivienda={vivienda} />
        ))}
      </div>
    </div>
  );
};

export default ViviendaTab;
