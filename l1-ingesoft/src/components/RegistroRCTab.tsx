"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  dataRegistroResidencial,
  RegistroResidencialType,
} from "@/testdata/dataRegistroR";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fetchRegistroResidencial } from "@/actions/registroresidencial";
import RegistroCard from "./RegistroCard";

const RegistroRCTab = () => {
  const [registroresidencial, setRegistroResidencial] = useState<
    RegistroResidencialType[]
  >([]);
  const [filteredRegistroResidencial, setFilteredRegistroResidencial] =
    useState<RegistroResidencialType[]>([]);
  const [nombreFilter, setNombreFilter] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulación de consulta a la API

    // const loadData = async () => {
    //     const { data, error } = await fetchDepartamentos(); // Llama a la función fetch

    //     if (error) {
    //       setError(error); // Si hay un error, actualiza el estado de error
    //     } else {
    //       setError(null) // Restablecer el error si no hay error
    //       setDepartamentos(data);
    //       setFilteredDepartamentos(data) // Si no hay error, actualiza el estado con los datos
    //     }
    //   };

    //loadData()
    setRegistroResidencial(dataRegistroResidencial);
    setFilteredRegistroResidencial(dataRegistroResidencial);
  }, []);

  useEffect(() => {
    // Filtrar departamentos por nombre
    const filtered = registroresidencial.filter((registroresidencial) =>
      registroresidencial.id_registro
        .toString()
        .toLowerCase()
        .startsWith(nombreFilter.toLowerCase())
    );

    // Si no hay resultados, establecer el error, sino, resetear el error
    if (filtered.length === 0 && nombreFilter !== "") {
      setError(
        "No se encontraron registros residenciales que coincidan con el filtro aplicado."
      );
    } else {
      setError(null); // Restablecer el error si hay resultados
    }

    setFilteredRegistroResidencial(filtered); // Actualiza los departamentos filtrados
  }, [nombreFilter, registroresidencial]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Registro Residencial</h1>
          <p className="text-sm text-gray-600">
            Registro Residencial y su información relevante
          </p>
        </div>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Filtrar por identificador del registro residencial"
          value={nombreFilter}
          onChange={(e) => setNombreFilter(e.target.value)}
          className="max-w-sm bg-gray-200"
        />
      </div>

      {/* Mostrar alerta si hay un error */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      {/* Mostrar departamentos filtrados si no hay error */}
      {filteredRegistroResidencial.length > 0 && !error ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredRegistroResidencial.map((registroresidencial) => (
            <RegistroCard
              key={registroresidencial.id_registro}
              registro={registroresidencial}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RegistroRCTab;
