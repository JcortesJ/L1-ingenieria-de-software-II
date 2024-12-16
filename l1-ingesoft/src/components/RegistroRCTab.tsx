"use client";

import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { RegistroResidencialType } from "@/testdata/dataRegistroR";
import { fetchRegistroResidencial } from "@/actions/registroresidencial";
import RegistroCard from "./RegistroCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const RegistroRCTab = () => {
  const [registroResidencial, setRegistroResidencial] = useState<RegistroResidencialType[]>([]);
  const [nombreFilter, setNombreFilter] = useState("");
  const [filtroVigente, setFiltroVigente] = useState<"todos" | "vigentes" | "no-vigentes">("todos");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { data, error } = await fetchRegistroResidencial();
      if (error) {
        setError(error);
      } else {
        setError(null);
        setRegistroResidencial(data);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  const filteredRegistroResidencial = useMemo(() => {
    if (loading) return [];

    return registroResidencial.filter((registro) => {
      const matchesNombre = registro.id_registro
        .toString()
        .toLowerCase()
        .includes(nombreFilter.toLowerCase());

      const matchesVigencia =
        filtroVigente === "todos" ||
        (filtroVigente === "vigentes" && registro.es_vigente) ||
        (filtroVigente === "no-vigentes" && !registro.es_vigente);

      return matchesNombre && matchesVigencia;
    });
  }, [registroResidencial, nombreFilter, filtroVigente, loading]);

  useEffect(() => {
    if (!loading && filteredRegistroResidencial.length === 0 && (nombreFilter !== "" || filtroVigente !== "todos")) {
      setError("No se encontraron registros residenciales que coincidan con los filtros aplicados.");
    } else {
      setError(null);
    }
  }, [filteredRegistroResidencial, nombreFilter, filtroVigente, loading]);

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

      <div className="mb-4 flex flex-row gap-2">
        <Input
          type="text"
          placeholder="Filtrar por identificador del registro residencial"
          value={nombreFilter}
          onChange={(e) => setNombreFilter(e.target.value)}
          className="max-w-sm bg-gray-200"
        />
        <Select
          onValueChange={(value: "todos" | "vigentes" | "no-vigentes") =>
            setFiltroVigente(value)
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
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!loading &&
          filteredRegistroResidencial.map((registro) => (
            <RegistroCard
              key={registro.id_registro}
              registro={registro}
            />
          ))}
      </div>
    </div>
  );
};

export default RegistroRCTab;

