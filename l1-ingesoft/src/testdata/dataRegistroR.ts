export interface RegistroResidencialType {
  id_registro: number;
  id_cdf: number;
  nombre_cabeza_hogar: string;
  id_vivienda: number;
  direccion_vivienda:string;
  modalidad_ocupacion: string;
  fecha_inicio: string;
  fecha_fin: string; // Opcional, por defecto será null
  es_vigente: boolean; // Opcional, por defecto será true
}

// export const dataRegistroResidencial: RegistroResidencialType[] = [
//   {
//     id_registro: 1,
//     idCdf: 21,
//     idVivienda: 11,
//     modalidadOcupacion: "ARRIENDO",
//     fechaInicio: "2011-11-10",
//     fechaFin: "2016-11-10",
//   },
//   {
//     id_registro: 2,
//     idCdf: 22,
//     idVivienda: 12,
//     modalidadOcupacion: "ARRIENDO",
//     fechaInicio: "2011-11-10",
//     fechaFin: "2016-11-10",
//   },
//   {
//     id_registro: 3,
//     idCdf: 23,
//     idVivienda: 13,
//     modalidadOcupacion: "ARRIENDO",
//     fechaInicio: "2011-11-10",
//     fechaFin: "2016-11-10",
//   },
// ];
