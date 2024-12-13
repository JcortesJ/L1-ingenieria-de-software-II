import { dataPersona } from "@/testdata/dataPersona";
import { CircleUserRound, Calendar, Activity, Home } from 'lucide-react';
import { Card, CardContent } from "./ui/card";

const PersonaCard = ({ persona }: { persona: dataPersona }) => {
  return (
    <Card className="w-48 h-60 p-0 bg-gray-100 border-gray-500">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex flex-col items-center mb-4">
          <CircleUserRound className="w-10 h-10 stroke-primary mb-2" />
          <h2 className="text-xl font-bold text-center">{persona.nombre}</h2>
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
        </div>
      </CardContent>
    </Card>
  );
}

export default PersonaCard;

