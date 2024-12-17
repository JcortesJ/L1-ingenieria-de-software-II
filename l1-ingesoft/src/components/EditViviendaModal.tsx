import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

import ViviendaType from "@/testdata/dataViviendas";
import { updateDireccionVivienda } from "@/actions/vivienda";

interface EditViviendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  vivienda: ViviendaType;
  onUpdate: (updatedVivienda: ViviendaType) => void;
}

export const EditViviendaModal = ({
  isOpen,
  onClose,
  vivienda,
  onUpdate,
}: EditViviendaModalProps) => {
  const [direccion, setDireccion] = useState(vivienda.direccion);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateDireccionVivienda(vivienda.id_vivienda, { direccion });
      onUpdate({ ...vivienda, direccion });
      toast({
        title: "Actualización exitosa",
        description: "Los datos de la vivienda han sido actualizados.",
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
          <DialogTitle>Editar Vivienda</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direccion" className="text-right">
                Dirección
              </Label>
              <Input
                id="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Actualizando..." : "Actualizar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
