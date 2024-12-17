import { Home, Edit, Map } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { ViviendaType } from "@/testdata/dataViviendas";
import { EditViviendaModal } from "./EditViviendaModal";

const ViviendaCard = ({
  vivienda,
  onUpdate,
}: {
  vivienda: ViviendaType;
  onUpdate: (updatedVivienda: ViviendaType) => void;
}) => {
  const [isModalEdit, setIsModalEdit] = useState(false);

  return (
    <>
      <Card className="relative w-64 cursor-pointer transition-all duration-300 bg-gray-100 border-gray-500">
        <CardContent className="p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => {
              setIsModalEdit(true);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 mb-2">
            <Home className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-bold mb-2">{vivienda.direccion}</h3>
          <div className="text-sm space-y-1">
            <p className="flex items-center">
              <span className="font-bold">ID:</span>
              {vivienda.id_vivienda}
            </p>
            <p className="flex items-center">
              <Home className="w-4 h-4 mr-2" /> {vivienda.tipo}
            </p>
            <p className="flex items-center">
              <Map className="w-4 h-4 mr-2" /> {vivienda.nombre_municipio}
            </p>
          </div>
        </CardContent>
      </Card>
      <EditViviendaModal
        isOpen={isModalEdit}
        onClose={() => setIsModalEdit(false)}
        vivienda={vivienda}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default ViviendaCard;
