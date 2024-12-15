import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInputData(entityName: string) {
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
        defaultValue: new Date().toISOString().split("T")[0],
        required: true,
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
        type: "text",
        placeholder: "Ej: 1234567890",
        id: "idCabezaFamilia",
        defaultValue: "",
        required: true,
        dependsFrom: {
          field: "esCabezaFamilia",
          value: false,
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
          field: "esCabezaFamilia",
          value: true,
        },
      },
      {
        label: "Ingrese la modalidad de la ocupación",
        type: "text",
        placeholder: "Ej: Propiedad, Arriendo, etc",
        id: "modalidadOcupacion",
        defaultValue: "",
        required: true,
        dependsFrom: {
          field: "esCabezaFamilia",
          value: true,
        },
      },
      {
        label: "Fecha de inicio de la ocupación",
        type: "date",
        placeholder: "Ingrese la fecha de inicio de la ocupación",
        id: "fechaInicioOcupacion",
        defaultValue: new Date().toISOString().split("T")[0],
        required: true,
        dependsFrom: {
          field: "esCabezaFamilia",
          value: true,
        },
      },
      {
        label: "Fecha de fin de la ocupación",
        type: "date",
        placeholder: "Ingrese la fecha de fin de la ocupación",
        id: "fechaFinOcupacion",
        defaultValue: new Date().toISOString().split("T")[0],
        required: true,
        dependsFrom: {
          field: "esCabezaFamilia",
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
          field: "esCabezaFamilia",
          value: true,
        },
      },
      {
        label: "¿Tiene una vivienda?",
        type: "checkbox",
        placeholder: "Tiene una vivienda",
        id: "tieneVivienda",
        defaultValue: false,
        required: false,
        dependsFrom: {
          field: "esCabezaFamilia",
          value: false,
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
          field: "tieneVivienda",
          value: true,
        },
      },
    ];
  }
  if (entityName === "vivienda") {
    data = [
      {
        label: "Tipo de vivienda",
        type: "text",
        placeholder: "Ej: Casa, Apartamento, etc",
        id: "tipoVivienda",
        defaultValue: "",
        required: true,
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
    ];
  }
  if (entityName === "delete") {
    data = [
      {
        label: "Ingrese el identificador de la vivienda",
        type: "text",
        placeholder: "Ej: 1234567890",
        id: "idVivienda",
        defaultValue: "",
        required: true,
      },
    ];
  }
  return data;
}
