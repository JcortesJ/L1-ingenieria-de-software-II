import { useState } from 'react';
import { PersonaType } from "@/testdata/dataPersona";
import { CircleUserRound, Calendar, Activity, Home, MapPin, Map, Edit } from 'lucide-react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { EditPersonaModal } from './EditPersonaModal';


const PersonaCard = ({ persona }: { persona: PersonaType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="w-64 h-80 p-0 bg-gray-100 border-gray-500 relative">
      <CardContent className="p-4 flex flex-col h-full">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>

        <div className="flex flex-col items-center mb-4">
          <CircleUserRound className="w-10 h-10 stroke-primary mb-2" />
          <h2 className="text-lg font-bold text-center truncate w-full" title={persona.nombre}>
            {persona.nombre}
          </h2>
        </div>

        <div className="grid grid-cols-[auto,1fr] gap-3 text-sm">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <span>{persona.fecha_nacimiento}</span>

          <Activity className="w-5 h-5 text-muted-foreground" />
          <span className={persona.vivo ? "text-green-600" : "text-red-600"}>
            {persona.vivo ? "Vivo" : "Fallecido"}
          </span>

          <Home className="w-5 h-5 text-muted-foreground" />
          <span>{persona.numCasas} {persona.numCasas === 1 ? "casa" : "casas"}</span>

          <MapPin className="w-5 h-5 text-muted-foreground" />
          <span className="truncate" title={persona.municipio}>{persona.municipio}</span>

          <Map className="w-5 h-5 text-muted-foreground" />
          <span className="truncate" title={persona.departamento}>{persona.departamento}</span>
        </div>
      </CardContent>

      <EditPersonaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        persona={persona}
      />
    </Card>
  );
}

export default PersonaCard;

