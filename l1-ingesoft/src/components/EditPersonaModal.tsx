import { useState } from 'react';
import { PersonaType } from "@/testdata/dataPersona";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

import { useToast } from '@/hooks/use-toast';
import { updatePersona } from '@/actions/personas';


interface EditPersonaModalProps {
  isOpen: boolean;
  onClose: () => void;
  persona: PersonaType;
}

export const EditPersonaModal = ({ isOpen, onClose, persona }: EditPersonaModalProps) => {
  const [nombre, setNombre] = useState(persona.nombre);
  const [vivo, setVivo] = useState(persona.vivo);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updatePersona(persona.id, { nombre, vivo });
      toast({
        title: "Actualización exitosa",
        description: "Los datos de la persona han sido actualizados.",
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar los datos de la persona.",
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
          <DialogTitle>Editar Persona</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vivo" className="text-right">
                Vivo
              </Label>
              <Switch
                id="vivo"
                checked={vivo}
                onCheckedChange={setVivo}
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

