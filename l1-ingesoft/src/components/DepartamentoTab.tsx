"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import DepartamentoCard from "@/components/DepartamentoCard"; // Componente similar al MunicipioCard
import { DepartamentoType } from "@/testdata/dataDepartamento";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fetchDepartamentos } from "@/actions/departamentos";
import { AnimatedCard } from "./ui/AnimatedCard";
import { Skeleton } from "./ui/skeleton";

const DepartamentoTab = () => {
  const [departamentos, setDepartamentos] = useState<DepartamentoType[]>([]);
  const [filteredDepartamentos, setFilteredDepartamentos] = useState<
    DepartamentoType[]
  >([]);
  const [nombreFilter, setNombreFilter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de consulta a la API

    const loadData = async () => {
      setLoading(true); // Establecer el estado de carga en verdadero
      const { data, error } = await fetchDepartamentos(); // Llama a la función fetch

      if (error) {
        setError(error);
      } else {
        setError(null);
        setDepartamentos(data);
        setFilteredDepartamentos(data);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      // Filtrar departamentos por nombre
      const filtered = departamentos.filter((departamento) =>
        departamento.nombre.toLowerCase().startsWith(nombreFilter.toLowerCase())
      );

      // Si no hay resultados, establecer el error, sino, resetear el error
      if (filtered.length === 0 && nombreFilter !== "") {
        setError(
          "No se encontraron departamentos que coincidan con el filtro aplicado."
        );
      } else {
        setError(null); // Restablecer el error si hay resultados
      }

      setFilteredDepartamentos(filtered); // Actualiza los departamentos filtrados
    }
  }, [loading, nombreFilter, departamentos]);

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

      {/* Mostrar alerta si hay un error */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      {/* Mostrar departamentos filtrados si no hay error */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? [...Array(3)].map((_, index) => (
              <AnimatedCard key={index}>
                <h2
                  className="text-lg font-bold text-center truncate w-full"
                  title={"Departamento"}
                >
                  Departamento
                </h2>
                <Skeleton className="h-5 w-4vw" />
                <p>Cargando...</p>
              </AnimatedCard>
            ))
          : filteredDepartamentos.length > 0 && !error
          ? filteredDepartamentos.map((departamento) => (
              <DepartamentoCard
                key={departamento.id_departamento}
                departamento={departamento}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default DepartamentoTab;
