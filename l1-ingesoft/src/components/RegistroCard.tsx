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
          {registro.id_registro}
          {registro.esVigente ? (
              <div className="w-5 h-5 rounded-full bg-green-500" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-red-500" />
            )}

        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="flex flex-col items-start gap-2">
            <span className="font-medium">
              <strong>ID Registro:</strong> {registro.id_registro}
            </span>
            <span className="font-medium">
              <strong>ID CDF:</strong> {registro.id_cabeza_hogar}
            </span>
            <span className="font-medium">
              <strong>ID Vivienda:</strong> {registro.id_vivienda}
            </span>
            <span className="font-medium">
              <strong>Direccion:</strong> {registro.direccion}
            </span>
            <span className="font-medium">
              <strong>Modalidad Ocupacion:</strong>{" "}
              {registro.tipo}
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
