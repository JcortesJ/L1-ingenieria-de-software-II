import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";
import { RegistroResidencialType } from "@/testdata/dataRegistroR";

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
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="flex flex-col items-start gap-2">
            <span className="font-medium">
              <strong>ID Registro:</strong> {registro.id_registro}
            </span>
            <span className="font-medium">
              <strong>ID CDF:</strong> {registro.idCdf}
            </span>
            <span className="font-medium">
              <strong>ID Vivienda:</strong> {registro.idVivienda}
            </span>
            <span className="font-medium">
              <strong>Modalidad Ocupacion:</strong>{" "}
              {registro.modalidadOcupacion}
            </span>
            <span className="font-medium">
              <strong>Fecha Inicio:</strong> {registro.fechaInicio}
            </span>
            <span className="font-medium">
              <strong>Fecha Fin:</strong> {registro.fechaFin}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistroCard;
