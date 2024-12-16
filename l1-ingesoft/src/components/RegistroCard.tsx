import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";
import { RegistroResidencialType } from "@/testdata/dataRegistroR";
import { formatearFecha } from "@/lib/utils";

interface RegistroCardProps {
  registro: RegistroResidencialType;
}

const RegistroCard = ({ registro }: RegistroCardProps) => {
  return (
    <Card className="w-full max-w-sm bg-gray-100 border-gray-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5 text-green-500" />
          {registro.direccion_vivienda }
          

        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
          {registro.es_vigente ? (
              <div className="w-5 h-5 rounded-full bg-green-500" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-red-500" />
            )}
            <span className="font-bold">Vigencia</span>
          </div>
          
          <p className="flex flex-col items-start gap-2">
            <span className="font-medium">
              <strong>ID Registro:</strong> {registro.id_registro}
            </span>
            <span className="font-medium">
              <strong>ID CDF:</strong> {registro.id_cdf}
            </span>
            <span className="font-medium">
              <strong>ID Vivienda:</strong> {registro.id_vivienda}
            </span>
            <span className="font-medium">
              <strong>Direccion:</strong> {registro.direccion_vivienda}
            </span>
            <span className="font-medium">
              <strong>Modalidad Ocupacion:</strong>{" "}
              {registro.modalidad_ocupacion}
            </span>
            <span className="font-medium">
              <strong>Fecha Inicio:</strong> {formatearFecha(registro.fecha_inicio) }
            </span>
            <span className="font-medium">
              <strong>Fecha Fin:</strong> {formatearFecha(registro.fecha_fin) }
            </span>
            
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistroCard;
