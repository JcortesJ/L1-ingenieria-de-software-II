import { Home, User, Key, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ViviendaType } from '@/testdata/dataViviendas'

  
const ViviendaCard = ({ vivienda}: { vivienda: ViviendaType }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [personasACargo, setPersonasACargo] = useState<string[]>([])

    const handleViviendaClick = async () => {
        if (vivienda.esVigente) {
          
    
          const mockPersonasACargo = ['Ana García', 'Pedro López', 'María Rodríguez']
          setPersonasACargo(mockPersonasACargo)
          setModalOpen(true)
        }
      }

    return(<>
    <Card className={`w-64 cursor-pointer transition-all duration-300 bg-gray-100 border-gray-500 ${vivienda.esVigente ? 'hover:shadow-lg' : 'opacity-60'}`} onClick={handleViviendaClick}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Home className="w-6 h-6 text-primary" />
          {vivienda.esVigente ? (
            <div className="w-5 h-5 rounded-full bg-green-500" />
          ) : (
            <div className="w-5 h-5 rounded-full bg-red-500" />
          )}
        </div>
        <h3 className="font-bold mb-2">{vivienda.direccion}</h3>
        <div className="text-sm space-y-1">
          <p className="flex items-center">
            <Home className="w-4 h-4 mr-2" /> {vivienda.tipo}
          </p>
          <p className="flex items-center">
            <User className="w-4 h-4 mr-2" /> {vivienda.nombre_cabeza_hogar}
          </p>
          <p className="flex items-center">
            <Key className="w-4 h-4 mr-2" /> {vivienda.modalidad_ocupacion}
          </p>
        </div>
      </CardContent>
    </Card>

    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Personas a cargo de {vivienda.nombre_cabeza_hogar}</DialogTitle>
          </DialogHeader>
          <ul className="list-disc list-inside">
            {personasACargo.map((persona, index) => (
              <li key={index}>{persona}</li>
            ))}
          </ul>
          <Button onClick={() => setModalOpen(false)}>Cerrar</Button>
        </DialogContent>
      </Dialog>
    </>
        
    )
    
}
export default ViviendaCard