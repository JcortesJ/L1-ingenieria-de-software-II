import { useState } from 'react';
import { PersonaType } from "@/testdata/dataPersona";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from '@/hooks/use-toast';
import { updatePersona } from '@/actions/personas';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface EditPersonaModalProps {
  isOpen: boolean;
  onClose: () => void;
  persona: PersonaType;
  onUpdate: (updatedPersona: PersonaType) => void;
}

export const EditPersonaModal = ({ isOpen, onClose, persona, onUpdate }: EditPersonaModalProps) => {
  const [nombre, setNombre] = useState(persona.nombre);
  const [genero, setGenero] = useState<string>(persona.genero || "MASCULINO");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updatePersona(persona.id, { nombre, genero });
      onUpdate({ ...persona, nombre, genero });
      toast({
        title: "Actualización exitosa",
        description: "Los datos de la persona han sido actualizados.",
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
              <Label htmlFor="genero" className="text-right">
                Género
              </Label>
              <Select value={genero} onValueChange={(value) => setGenero(value)}>
                <SelectTrigger id='genero' className="bg-gray-200">
                  <SelectValue placeholder="Seleccione género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MASCULINO">Masculino</SelectItem>
                  <SelectItem value="FEMENINO">Femenino</SelectItem>
                  <SelectItem value="NO_BINARIO">No binario</SelectItem>
                </SelectContent>
              </Select>
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

