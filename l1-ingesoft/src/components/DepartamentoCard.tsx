import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";
import { DepartamentoType } from "@/testdata/dataDepartamento";

interface DepartamentoCardProps {
  departamento: DepartamentoType;
}

const DepartamentoCard = ({ departamento }: DepartamentoCardProps) => {
  return (
    <Card className="w-full max-w-sm bg-gray-100 border-gray-500">
      <CardHeader>
        <CardTitle className="flex  items-start gap-2">
          <Map className="h-5 w-5 text-green-500" />
          <span className="text-sm text-gray-600">Identificador:</span>
          <span className="font-medium">{departamento.id_departamento}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <span className="font-medium">{departamento.nombre}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartamentoCard;
