import { fetchPersonas } from "@/actions/personas";
import ViviendaType from "@/testdata/dataViviendas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getViviendasVacias } from "@/actions/personas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// El array cdf puede estar vacío por varias razones:
// 1. La respuesta de fetchPersonas() podría estar vacía o ser null
// 2. Ninguna persona en los datos cumple la condición de ser cabeza de familia (id === id_cabeza_familia)
// 3. Los datos podrían tener un formato incorrecto
const getAllCdf = async () => {
  const response = await fetchPersonas();
  const { data } = response;
  const allCdfs: { value: string; label: string }[] = [];
  if (!data || !Array.isArray(data)) {
    console.error("No hay datos de personas o el formato es incorrecto");
    return [];
  }
  data.forEach(
    (persona: {
      id: number;
      id_cabeza_familia: number;
      nombre: string;
      isCdf: boolean;
    }) => {
      if (persona && persona.isCdf) {
        allCdfs.push({
          value: persona.id_cabeza_familia.toString(),
          label: persona.nombre ?? "",
        });
      }
    }
  );
  return allCdfs;
};
const getViviendasVacias_ = async (): Promise<
  { value: number; label: string }[]
> => {
  const { data, error } = await getViviendasVacias();
  console.log("data", data);
  if (error) {
    console.error("Error al obtener las viviendas vacias:", error);
  }

  if (!data) {
    console.error("No se recibió ningún dato para las viviendas vacias.");
  }

  const vacias = [] as { value: number; label: string }[];
  data.forEach((vivienda: ViviendaType) =>
    vacias.push({
      value: vivienda.id_vivienda ?? 0,
      label: vivienda.direccion ?? "",
    })
  );
  console.log("vacias", vacias);
  return vacias;
};

export const formatearFecha = (fecha: string) => {
  const fechaObj = new Date(fecha); // Convierte la cadena en un objeto Date
  return fechaObj.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export async function getInputData(entityName: string) {
  const cdf = await getAllCdf();
  const viviendasVacias = await getViviendasVacias_();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = [];
  if (entityName === "person") {
    data = [
      {
        label: "Nombre",
        type: "text",
        placeholder: "Ingrese el nombre de la persona",
        id: "nombre",
        defaultValue: "",
        required: true,
      },
      {
        label: "Fecha de nacimiento",
        type: "date",
        placeholder: "Ingrese la fecha de nacimiento",
        id: "fechaNacimiento",
        defaultValue: "",
        required: true,
      },
      {
        label: "Genero",
        type: "select",
        placeholder: "Seleccione el genero",
        id: "genero",
        defaultValue: "",
        required: true,
        options: [
          { value: "masculino", label: "Masculino" },
          { value: "femenino", label: "Femenino" },
          { value: "no_binario", label: "Otro" },
        ],
      },
      {
        label: "¿Es cabeza de familia?",
        type: "checkbox",
        placeholder: "Es cabeza de familia",
        id: "esCabezaFamilia",
        defaultValue: false,
        required: true,
      },
      {
        label: "¿Quien es su cabeza de familia?",
        type: "select",
        placeholder: "Seleccione el cabeza de familia",
        id: "idCabezaFamilia",
        defaultValue: "",
        required: true,
        options: cdf,
        dependsFrom: {
          field: "esCabezaFamilia",
          value: false,
        },
      },
      {
        label: "Habita una vivienda?",
        type: "checkbox",
        placeholder: "Posee una vivienda",
        id: "poseeVivienda",
        defaultValue: false,
        required: true,
        dependsFrom: {
          field: "esCabezaFamilia",
          value: true,
        },
      },
      {
        label: "Ingrese el identificador de la vivienda",
        type: "text",
        placeholder: "Ej: 1234567890",
        id: "idVivienda",
        defaultValue: "",
        required: true,
        dependsFrom: {
          field: "poseeVivienda",
          value: true,
        },
      },
      {
        label: "Ingrese la modalidad de la ocupación",
        type: "select",
        placeholder: "Seleccione la modalidad de la ocupación",
        id: "modalidadOcupacion",
        defaultValue: "",
        required: true,
        options: [
          { value: "propiedad", label: "Propiedad" },
          { value: "arriendo", label: "Arriendo" },
          { value: "otro", label: "Otro" },
        ],
        dependsFrom: {
          field: "poseeVivienda",
          value: true,
        },
      },
      {
        label: "Fecha de inicio de la ocupación",
        type: "date",
        placeholder: "Ingrese la fecha de inicio de la ocupación",
        id: "fechaInicioOcupacion",
        defaultValue: "",
        required: true,
        dependsFrom: {
          field: "poseeVivienda",
          value: true,
        },
      },
      {
        label: "Fecha de fin de la ocupación",
        type: "date",
        placeholder: "Ingrese la fecha de fin de la ocupación",
        id: "fechaFinOcupacion",
        defaultValue: "",
        required: false,
        dependsFrom: {
          field: "poseeVivienda",
          value: true,
        },
      },
      {
        label: "¿Es vigente?",
        type: "checkbox",
        placeholder: "Es vigente",
        id: "esVigente",
        defaultValue: true,
        required: true,
        dependsFrom: {
          field: "poseeVivienda",
          value: true,
        },
      },
    ];
  }
  if (entityName === "vivienda") {
    data = [
      {
        label: "Tipo de vivienda",
        type: "select",
        placeholder: "Seleccione el tipo de vivienda",
        id: "tipoVivienda",
        defaultValue: "",
        required: true,
        options: [
          { value: "casa", label: "Casa" },
          { value: "apartamento", label: "Apartamento" },
          { value: "conjunto", label: "Conjunto" },
        ],
      },
      {
        label: "Dirección",
        type: "text",
        placeholder: "Ingrese la dirección de la vivienda",
        id: "direccion",
        defaultValue: "",
        required: true,
      },
      {
        label: "Ingrese el identificador del municipio",
        type: "text",
        placeholder: "Ej: 1234567890",
        id: "idMunicipio",
        defaultValue: "",
        required: true,
      },
      {
        label: "Ingrese el identificador de la persona",
        type: "text",
        placeholder: "Ej: 1234567890",
        id: "idPersona",
        defaultValue: "",
        required: true,
      },
    ];
  }
  if (entityName === "delete") {
    data = [
      {
        label: "Ingrese el identificador de la vivienda a eliminar",
        type: "text",
        placeholder: "Ej: 1234567890",
        id: "idViviendaDelete",
        defaultValue: "",
        required: true,
      },
      {
        label:
          "Ingrese el identificador de la vivienda a la que se trasladarán los habitantes",
        type: "select",
        placeholder: "Seleccione la vivienda",
        id: "idViviendaTransfer",
        defaultValue: "",
        required: true,
        options: viviendasVacias,
      },
      {
        label: "Ingrese el identificador del cabeza de familia",
        type: "select",
        placeholder: "Seleccione el cabeza de familia",
        id: "idCabezaFamilia",
        defaultValue: "",
        required: true,
        options: cdf,
      },
      {
        label: "Ingrese la fecha de inicio de la ocupación",
        type: "date",
        placeholder: "Ingrese la fecha de inicio de la ocupación",
        id: "fechaInicioOcupacion",
        defaultValue: "",
        required: true,
      },
      {
        label: "Ingrese la modalidad de la ocupación",
        type: "select",
        placeholder: "Seleccione la modalidad de la ocupación",
        id: "modalidadOcupacion",
        defaultValue: "",
        required: true,
        options: [
          { value: "propiedad", label: "Propiedad" },
          { value: "arriendo", label: "Arriendo" },
          { value: "otro", label: "Otro" },
        ],
      },
    ];
  }
  return data;
}
