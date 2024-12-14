
import DepartamentoTab from "@/components/DepartamentoTab"
import MunicipioTab from "@/components/MunicipioTab"
import PersonaTab from "@/components/PersonaTab"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import ViviendaTab from "@/components/ViviendaTab"


const queryPage = () => {
    return (
        <div className="w-full h-full p-16">
            <h1 className="text-3xl font-bold mb-4 ">Realice las consultas y observe su resultado</h1>
            <Tabs defaultValue="Personas" className="w-full ">
                <TabsList className="w-full flex bg-[#546057] text-white ">
                    <TabsTrigger className="flex-1 data-[state=active]:bg-[#C1C8C1] " value="Personas">Personas</TabsTrigger>
                    <TabsTrigger className="flex-1" value="Viviendas">Viviendas</TabsTrigger>
                    <TabsTrigger  className="flex-1" value="Municipios">Municipios</TabsTrigger>
                    <TabsTrigger className="flex-1" value="Departamentos">Departamentos</TabsTrigger>
                </TabsList>
                <TabsContent value="Personas"><PersonaTab/></TabsContent>
                <TabsContent value="Viviendas"><ViviendaTab/></TabsContent>
                <TabsContent value="Municipios"><MunicipioTab/></TabsContent>
                <TabsContent value="Departamentos"><DepartamentoTab/></TabsContent>

            </Tabs>
        </div>

    )
}

export default queryPage