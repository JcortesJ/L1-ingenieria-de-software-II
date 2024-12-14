"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import MunicipioCard from "./MunicipioCard";
import dataMunicipios, { MunicipioType } from "@/testdata/dataMunicipios";
//import { fetchMunicipios } from "@/actions/municipios"

const MunicipioTab = () => {
  const [municipios, setMunicipios] = useState<MunicipioType[]>([]);
  const [filteredMunicipios, setFilteredMunicipios] = useState<MunicipioType[]>(
    []
  );
  const [departamentoFilter, setDepartamentoFilter] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulación de consulta a la API

    // const loadData = async () => {
    //     const { data, error } = await fetchMunicipios(); // Llama a la función fetch

    //     if (error) {
    //         setError(error); // Si hay un error, actualiza el estado de error
    //     } else {
    //         setError(null) // Restablecer el error si no hay error
    //         setMunicipios(data)
    //         setFilteredMunicipios(data)
    //     }
    // };

    // loadData()
    setMunicipios(dataMunicipios);
    setFilteredMunicipios(dataMunicipios);
  }, []);

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

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Municipios</h1>
          <p className="text-sm text-gray-600">Municipios, con su gobernador</p>
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

      {/* Mostrar alerta si hay un error */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      {/* Mostrar municipios filtrados si no hay error */}
      {filteredMunicipios.length > 0 && !error ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMunicipios.map((municipio) => (
            <MunicipioCard key={municipio.id_municipio} municipio={municipio} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MunicipioTab;
