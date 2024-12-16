import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { fetchMiembrosFamilia } from '@/actions/personas';
import { PersonaType } from '@/testdata/dataPersona';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

interface FamiliaModalProps {
  isOpen: boolean;
  onClose: () => void;
  persona: PersonaType;
}

export const FamiliaModal = ({ isOpen, onClose, persona }: FamiliaModalProps) => {
  const [familia, setFamilia] = useState<PersonaType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFamilia = async () => {
      if (!isOpen) return;

      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await fetchMiembrosFamilia(persona.id);
        if (error) {
          throw new Error(error);
        }
        if (data) {
          setFamilia(data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setError((error as Error).message || "Error al cargar los miembros de la familia");
      } finally {
        setIsLoading(false);
      }
    };
    loadFamilia();
  }, [isOpen, persona.id]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Los familiares de {persona.nombre} y que viven con él son:</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <p>Cargando...</p>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : familia.length > 0 ? (
          // La solución correcta: eliminar las llaves extra alrededor del `map`
          familia.map((familiar) => (
            <div key={familiar.id} className="text-sm">
              {familiar.nombre} - {familiar.genero}
            </div>
          ))
        ) : (
          <p>No se encontraron familiares viviendo con {persona.nombre}.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};
