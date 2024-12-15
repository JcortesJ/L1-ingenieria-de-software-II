export interface MunicipioType {
    id_municipio: number; // ID único del municipio
    nombre: string; // Nombre del municipio
    departamento: string; // Departamento al que pertenece el municipio
    id_departamento: number; // ID del departamento al que pertenece el municipio
    nombre_gobernador: string; // Nombre del gobernador del municipio
    id_gobernador: number; // ID del gobernador del municipio
}
const dataMunicipios: MunicipioType[] = [
    {
      id_municipio: 101,
      nombre: "Envigado",
      departamento: "Antioquia",
      id_departamento: 1,
      nombre_gobernador: "Aníbal Gaviria",
      id_gobernador: 1001
    },
    {
      id_municipio: 102,
      nombre: "Chía",
      departamento: "Cundinamarca",
      id_departamento: 2,
      nombre_gobernador: "Nicolás García",
      id_gobernador: 1002
    },
    {
      id_municipio: 103,
      nombre: "Cali",
      departamento: "Valle del Cauca",
      id_departamento: 3,
      nombre_gobernador: "Clara Luz Roldán",
      id_gobernador: 1003
    },
    {
      id_municipio: 104,
      nombre: "Barranquilla",
      departamento: "Atlántico",
      id_departamento: 4,
      nombre_gobernador: "Elsa Noguera",
      id_gobernador: 1004
    },
    {
      id_municipio: 105,
      nombre: "Cartagena",
      departamento: "Bolívar",
      id_departamento: 5,
      nombre_gobernador: "Vicente Blel",
      id_gobernador: 1005
    },
    {
      id_municipio: 106,
      nombre: "Bucaramanga",
      departamento: "Santander",
      id_departamento: 6,
      nombre_gobernador: "Mauricio Aguilar",
      id_gobernador: 1006
    }
  ];

  export default dataMunicipios;