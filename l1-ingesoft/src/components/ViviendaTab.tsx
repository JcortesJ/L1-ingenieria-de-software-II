"use client";

import {
  createVivienda,
  deleteVivienda,
  fetchViviendas,
} from "@/actions/vivienda";
import { useState, useEffect, useCallback } from "react";
import ViviendaType from "@/testdata/dataViviendas";
import ViviendaCard from "./ViviendaCard";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FormularioModal } from "./FormularioModal";
import { getInputData } from "@/lib/utils";
import { Input } from "./ui/input";
import { createRegistroResidencial } from "@/actions/registroresidencial";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

const ViviendaTab = () => {
  const [viviendas, setViviendas] = useState<ViviendaType[]>([]);
  const [filteredViviendas, setFilteredViviendas] = useState<ViviendaType[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [nombreFilter, setNombreFilter] = useState("");
  const [formInputs, setFormInputs] = useState([]);
  const [deleteInputs, setDeleteInputs] = useState([]);
  const [isInputsLoading, setIsInputsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { data, error } = await fetchViviendas();

      if (error) {
        setError(error);
      } else {
        setError(null);
        setViviendas(data);
        setFilteredViviendas(data);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadInputs = async () => {
      setIsInputsLoading(true);
      const viviendaInputs = await getInputData("vivienda");
      const deleteInputs = await getInputData("delete");
      setFormInputs(viviendaInputs);
      setDeleteInputs(deleteInputs);
      setIsInputsLoading(false);
    };
    loadInputs();
  }, []);

  const filters = () => {
    if (!loading) {
      const filtered = viviendas.filter((vivienda) =>
        vivienda.direccion.toLowerCase().startsWith(nombreFilter.toLowerCase())
      );

      if (filtered.length === 0 && nombreFilter !== "") {
        setError(
          "No se encontraron viviendas que coincidan con el filtro aplicado."
        );
      } else {
        setError(null);
      }

      setFilteredViviendas(filtered);
    }
  };

  useEffect(() => {
    filters();
  }, [nombreFilter, viviendas, loading]);

  const showErrorAlert = error || viviendas.length === 0;
  const alertMessage = error
    ? "Hubo un problema al obtener los datos."
    : "No se encontraron viviendas con ese filtro.";
  const alertTitle = error ? "Error al cargar las viviendas" : "Sin resultados";
  const alertVariant = error ? "destructive" : "default";

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
      toast({
        title: "Error al crear la vivienda",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Vivienda creada correctamente",
        variant: "default",
      });
    }
  }

  const updateViviendaInList = useCallback((updatedVivienda: ViviendaType) => {
    setViviendas((prevViviendas) =>
      prevViviendas.map((v) =>
        v.id_vivienda === updatedVivienda.id_vivienda ? updatedVivienda : v
      )
    );
    filters();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleDelete(data: Record<string, any>): Promise<void> {
    const {
      idViviendaDelete,
      idViviendaTransfer,
      idCabezaFamilia,
      fechaInicioOcupacion,
      modalidadOcupacion,
    } = data;
    const viviendaData = {
      idVivienda: Number(idViviendaDelete),
      idViviendaTransfer: Number(idViviendaTransfer),
      idCabezaFamilia: Number(idCabezaFamilia),
      fechaInicio: fechaInicioOcupacion,
      modalidadOcupacion: modalidadOcupacion,
    };
    const { error } = await deleteVivienda(viviendaData);
    if (error) {
      toast({
        title: "Error al eliminar la vivienda",
        description: error,
        variant: "destructive",
      });
    } else {
      const { error } = await createRegistroResidencial(
        Number(idCabezaFamilia),
        Number(idViviendaTransfer),
        modalidadOcupacion,
        fechaInicioOcupacion,
        ""
      );
      if (error) {
        toast({
          title: "Error al crear el registro residencial",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({
          title:
            "Vivienda eliminada correctamente, verifique el registro residencial",
          variant: "default",
        });
      }
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
          <Input
            className="bg-gray-200"
            placeholder="Buscar por nombre"
            value={nombreFilter}
            onChange={(e) => setNombreFilter(e.target.value)}
          />
          {!isInputsLoading && formInputs.length > 0 ? (
            <FormularioModal
              className="w-full md:w-[180px] bg-gray-200"
              title="Agregar Vivienda"
              name="Agregar Vivienda"
              inputs={formInputs}
              onSubmit={handleSubmit}
            />
          ) : (
            <Button className="w-full md:w-[180px] bg-gray-200 text-black">
              Cargando...
            </Button>
          )}
          {!isInputsLoading && deleteInputs.length > 0 ? (
            <FormularioModal
              className="w-full md:w-[180px] bg-destructive border-none hover:bg-destructive/90 hover:text-white"
              title="Para eliminar, reubica los habitantes a otra vivienda en caso de que esta tenga habitantes."
              name="Eliminar Vivienda"
              inputs={deleteInputs}
              onSubmit={handleDelete}
            />
          ) : null}
        </section>
      </div>

      {showErrorAlert && (
        <Alert variant={alertVariant ?? null}>
          <AlertTitle>{alertTitle}</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-row flex-wrap gap-2">
        {filteredViviendas.map((vivienda) => (
          <ViviendaCard
            key={vivienda.id_vivienda}
            vivienda={vivienda}
            onUpdate={updateViviendaInList}
          />
        ))}
      </div>
    </div>
  );
};

export default ViviendaTab;
