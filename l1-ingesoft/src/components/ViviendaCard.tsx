
import { Home, Key, Edit } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { useState } from 'react'
import { Button } from "@/components/ui/button"


import { ViviendaType } from '@/testdata/dataViviendas'
import { EditViviendaModal } from './EditViviendaModal'

const ViviendaCard = ({ vivienda }: { vivienda: ViviendaType }) => {
  // const [modalOpen, setModalOpen] = useState(false)
  // const [personasACargo, setPersonasACargo] = useState<string[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null)
  const [isModalEdit, setIsModalEdit] = useState(false);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const loadMiembrosFamilia = async (id: string) => {
  //   const { data, error } = await fetchMiembrosFamilia(id); // Llama a la función fetch

  //   if (error) {
  //     setError(error); // Si hay un error, actualiza el estado de error
  //   } else {
  //     setError(null); // Restablecer el error si no hay error
  //     setPersonasACargo(data);
  //     setModalOpen(true);
  //   }
  // };
  // const handleViviendaClick = async () => {
  //   if (vivienda.esVigente) {
  //     // Simulación de consulta a la API
  //     //loadMiembrosFamilia(vivienda.id_cabeza_hogar)
  //     const mockPersonasACargo = [
  //       "Ana García",
  //       "Pedro López",
  //       "María Rodríguez",
  //     ];
  //     setPersonasACargo(mockPersonasACargo);
  //     setModalOpen(true);
  //   }
  // };

  return (
    <>

      <Card className={` relative w-64 cursor-pointer transition-all duration-300 bg-gray-100 border-gray-500 `} >

        <CardContent className="p-4">
          <Button
            variant="ghost"
            size="icon"
            
            className={`absolute top-2 right-2 '}`}
            onClick={() => {  setIsModalEdit(true) }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 mb-2">
            <Home className="w-6 h-6 text-primary" />
            

            {/* <Button
              variant="outline"
              size="sm"
              
              className={`border-green-800 `}
              onClick={handleViviendaClick}
            >
              Habitantes
            </Button> */}
          </div>
          <h3 className="font-bold mb-2">{vivienda.direccion}</h3>
          <div className="text-sm space-y-1">
            <p className="flex items-center">
              <Home className="w-4 h-4 mr-2" /> {vivienda.tipo}
            </p>
           
            <p className="flex items-center">
              <Key className="w-4 h-4 mr-2" /> {vivienda.tipo}
            </p>
            
          </div>
        </CardContent>
      </Card>
      <EditViviendaModal
        isOpen={isModalEdit}
        onClose={() => setIsModalEdit(false)}
        vivienda={vivienda}
      />

      {/* <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Personas a cargo de {vivienda.nombre_cabeza_hogar}
            </DialogTitle>
          </DialogHeader>
          <ul className="list-disc list-inside">
            {personasACargo.map((persona, index) => (
              <li key={index}>{persona}</li>
            ))}
          </ul>
          <Button onClick={() => setModalOpen(false)}>Cerrar</Button>
        </DialogContent>
      </Dialog> */}
    </>
  );
};

export default ViviendaCard;
