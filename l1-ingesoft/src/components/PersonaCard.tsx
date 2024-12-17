import { useState } from "react";
import { PersonaType } from "@/testdata/dataPersona";
import {
  CircleUserRound,
  Calendar,
  Home,
  MapPin,
  Map,
  Edit,
  HomeIcon as House,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { EditPersonaModal } from "./EditPersonaModal";
import { formatearFecha } from "@/lib/utils";
import { FaTransgender } from "react-icons/fa";
import { ChangeResidenciaModal } from "./ChangeResidenciaModal";
import { FamiliaModal } from "./FamiliaModal";

const PersonaCard = ({
  persona,
  onUpdate,
}: {
  persona: PersonaType;
  onUpdate: (updatedPersona: PersonaType) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalChangeResidencia, setIsModalChangeResidencia] = useState(false);
  const [isModalFamilia, setIsModalFamilia] = useState(false);

  return (
    <Card className="w-64 h-88 p-0 bg-gray-100 border-gray-500 relative">
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
          <h2
            className="text-lg font-bold text-center truncate w-full"
            title={persona.nombre}
          >
            {persona.nombre}
          </h2>
          <span className="truncate">Id: {persona.id}</span>
        </div>

        <div className="grid grid-cols-[auto,1fr] gap-3 text-sm">
          <House className="w-5 h-5 text-muted-foreground" />

          <span className="truncate" title={"cabeza de familia"}>
            {persona.isCdf ? "Es cabeza de familia" : "No es cabeza de familia"}
          </span>
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <span>{formatearFecha(persona.fecha_nacimiento)}</span>
          <FaTransgender className="w-5 h-5 text-muted-foreground" />
          <span className="truncate" title={"genero"}>
            {persona.genero}
          </span>

          <Home className="w-5 h-5 text-muted-foreground" />
          <span>
            {persona.numCasas} {persona.numCasas === 1 ? "casa" : "casas"}
          </span>

          <MapPin className="w-5 h-5 text-muted-foreground" />
          <span className="truncate" title={persona.municipio}>
            {persona.municipio}
          </span>

          <Map className="w-5 h-5 text-muted-foreground" />
          <span className="truncate" title={persona.departamento}>
            {persona.departamento}
          </span>
        </div>
        <Button
          className={`${
            !persona.isCdf ? "hidden" : "block"
          } bg-green-500 font-bold mt-4 w-40`}
          onClick={() => setIsModalChangeResidencia(true)}
          variant="ghost"
          size="sm"
        >
          Cambiar Residencia
        </Button>
        <Button
          className={` bg-blue-500 font-bold mt-4 w-40`}
          onClick={() => setIsModalFamilia(true)}
          variant="ghost"
          size="sm"
        >
          Familiares
        </Button>
      </CardContent>

      <EditPersonaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        persona={persona}
        onUpdate={onUpdate}
      />
      <ChangeResidenciaModal
        isOpen={isModalChangeResidencia}
        onClose={() => setIsModalChangeResidencia(false)}
        persona={persona}
      />
      <FamiliaModal
        key={persona.id + "modal"}
        isOpen={isModalFamilia}
        onClose={() => setIsModalFamilia(false)}
        persona={persona}
      />
    </Card>
  );
};

export default PersonaCard;
