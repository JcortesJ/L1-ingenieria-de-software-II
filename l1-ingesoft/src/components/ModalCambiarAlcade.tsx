import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PersonaType } from "@/testdata/dataPersona"
import { MunicipioType } from "@/testdata/dataMunicipios"

interface CambiarAlcaldeModalProps {
  isOpen: boolean
  onClose: () => void
  onCambiarAlcalde: (nuevoAlcaldeId: number) => void
  municipio: MunicipioType
  personas: PersonaType[]
}

export const ModalCambiarAlcalde = ({
  isOpen,
  onClose,
  onCambiarAlcalde,
  municipio,
  personas
}: CambiarAlcaldeModalProps) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('')
  const [personasElegibles, setPersonasElegibles] = useState<PersonaType[]>([])

  useEffect(() => {
    console.log("Personas:", personas);
    const filteredPersonas = personas.filter(persona => persona.municipio === municipio.nombre)
    console.log("Filtered personas:", filteredPersonas);
    setPersonasElegibles(filteredPersonas)
  }, [personas, municipio])

  useEffect(() => {
    console.log("Modal isOpen:", isOpen);
  }, [isOpen]);

  const handleCambiarAlcalde = () => {
    if (selectedPersonaId) {
      onCambiarAlcalde(Number(selectedPersonaId))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seleccionar Nuevo Alcalde para {municipio.nombre}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {personasElegibles.length > 0 ? (
            <>
              <Select onValueChange={setSelectedPersonaId} value={selectedPersonaId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una persona" />
                </SelectTrigger>
                <SelectContent>
                  {personasElegibles.map((persona) => (
                    <SelectItem key={persona.id} value={persona.id.toString()}>
                      {persona.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DialogFooter>
                <Button onClick={handleCambiarAlcalde} disabled={!selectedPersonaId}>
                  Cambiar Alcalde
                </Button>
              </DialogFooter>
            </>
          ) : (
            <p>No hay personas elegibles para ser alcalde en este municipio.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

