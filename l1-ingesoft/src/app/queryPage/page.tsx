"use client";
import DepartamentoTab from "@/components/DepartamentoTab";
import MunicipioTab from "@/components/MunicipioTab";
import PersonaTab from "@/components/PersonaTab";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ViviendaTab from "@/components/ViviendaTab";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import RegistroRCTab from "@/components/RegistroRCTab";

const queryPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <div className="w-full h-full p-16">
      <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-center gap-4 md:gap-0 mb-10">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Realice las consultas y observe su resultado
        </h1>
        <Button
          variant={"link"}
          className="text-xl"
          onClick={() => {
            router.push("/");
          }}
        >
          Regresar al inicio
        </Button>
      </div>
      <Tabs defaultValue="Personas" className="w-full ">
        <TabsList className="w-full flex bg-[#546057] text-white ">
          <TabsTrigger
            className="flex-1 data-[state=active]:bg-[#C1C8C1] "
            value="Personas"
          >
            Personas
          </TabsTrigger>
          <TabsTrigger
            className="flex-1 data-[state=active]:bg-[#C1C8C1]"
            value="Viviendas"
          >
            Viviendas
          </TabsTrigger>
          <TabsTrigger
            className="flex-1 data-[state=active]:bg-[#C1C8C1]"
            value="Municipios"
          >
            Municipios
          </TabsTrigger>
          <TabsTrigger
            className="flex-1 data-[state=active]:bg-[#C1C8C1]"
            value="Departamentos"
          >
            Departamentos
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="Registro Residencial">
            Registro Residencial
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Personas">
          <PersonaTab />
        </TabsContent>
        <TabsContent value="Viviendas">
          <ViviendaTab />
        </TabsContent>
        <TabsContent value="Municipios">
          <MunicipioTab />
        </TabsContent>
        <TabsContent value="Departamentos">
          <DepartamentoTab />
        </TabsContent>
        <TabsContent value="Registro Residencial">
          <RegistroRCTab />
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
};

export default queryPage;
