import { useEffect, useState } from "react";
import { PersonaType } from "@/testdata/dataPersona";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createRegistroResidencial } from "@/actions/registroresidencial";
import { getViviendasVacias } from "@/actions/personas";
import { ViviendaType } from "@/testdata/dataViviendas";

interface ChangeResidenciaModalProps {
  isOpen: boolean;
  onClose: () => void;
  persona: PersonaType;
}

export const ChangeResidenciaModal = ({
  isOpen,
  onClose,
  persona,
}: ChangeResidenciaModalProps) => {
  const [viviendasVacias, setViviendasVacias] = useState<ViviendaType[]>([]);
  const [selectedVivienda, setSelectedVivienda] = useState<string>("");
  const [modalidadOcupacion, setModalidadOcupacion] =
    useState<string>("ARRIENDO");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchViviendasVacias = async () => {
      const { data, error } = await getViviendasVacias();
      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      } else if (data) {
        setViviendasVacias(data);
      }
    };

    if (isOpen) {
      fetchViviendasVacias();
    }
  }, [isOpen, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createRegistroResidencial(
        persona.id_cabeza_familia,
        parseInt(selectedVivienda),
        modalidadOcupacion,
        fechaInicio,
        fechaFin
      );
      toast({
        title: "Actualización exitosa",
        description: "La residencia de la persona ha sido actualizada.",
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Cambie donde habita la familia de {persona.nombre}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vivienda" className="text-right">
                Nueva Vivienda
              </Label>
              <Select
                value={selectedVivienda}
                onValueChange={setSelectedVivienda}
              >
                <SelectTrigger id="vivienda" className="col-span-3 bg-gray-200">
                  <SelectValue placeholder="Seleccione una vivienda" />
                </SelectTrigger>
                <SelectContent>
                  {viviendasVacias.map((vivienda) => (
                    <SelectItem
                      key={vivienda.id_vivienda}
                      value={vivienda.id_vivienda.toString()}
                    >
                      {vivienda.direccion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modalidadOcupacion" className="text-right">
                Modalidad de Ocupación
              </Label>
              <Select
                value={modalidadOcupacion}
                onValueChange={setModalidadOcupacion}
              >
                <SelectTrigger
                  id="modalidadOcupacion"
                  className="col-span-3 bg-gray-200"
                >
                  <SelectValue placeholder="Seleccione modalidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ARRIENDO">Arriendo</SelectItem>
                  <SelectItem value="PROPIERARIO">Propiedad</SelectItem>
                  <SelectItem value="OTRO">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fechaInicio" className="text-right">
                Fecha de Inicio
              </Label>
              <Input
                id="fechaInicio"
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fechaFin" className="text-right">
                Fecha de Fin (Opcional)
              </Label>
              <Input
                id="fechaFin"
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading || !selectedVivienda || !fechaInicio}
            >
              {isLoading ? "Actualizando..." : "Actualizar Residencia"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
