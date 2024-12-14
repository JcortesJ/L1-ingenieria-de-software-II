import { PersonaType } from "@/testdata/dataPersona";
import { CircleUserRound, Calendar, Activity, Home, MapPin, Map } from 'lucide-react';
import { Card, CardContent } from "./ui/card";

const PersonaCard = ({ persona }: { persona: PersonaType }) => {
  return (
    <Card className="w-48 h-72 p-0 bg-gray-100 border-gray-500">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex flex-col items-center mb-4">
          <CircleUserRound className="w-10 h-10 stroke-primary mb-2" />
          <h2 className="text-lg font-bold text-center">{persona.nombre}</h2>
        </div>

        <div className="grid grid-cols-[auto,1fr] gap-3 text-sm">
          {/* Fecha de nacimiento */}
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <span>{persona.fecha_nacimiento}</span>

          {/* Estado de vida */}
          <Activity className="w-5 h-5 text-muted-foreground" />
          <span className={persona.vivo ? "text-green-600" : "text-red-600"}>
            {persona.vivo ? "Vivo" : "Fallecido"}
          </span>

          {/* Número de casas */}
          <Home className="w-5 h-5 text-muted-foreground" />
          <span>{persona.numCasas} {persona.numCasas === 1 ? "casa" : "casas"}</span>

          {/* Municipio */}
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <span>{persona.municipio}</span>

          {/* Departamento */}
          <Map className="w-5 h-5 text-muted-foreground" />
          <span>{persona.departamento}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default PersonaCard;

