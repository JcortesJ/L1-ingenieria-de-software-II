export interface DepartamentoType {
  id_departamento: number; // ID único del departamento
  nombre: string; // Nombre del departamento
}
const dataDepartamentos: DepartamentoType[] = [
  {
    id_departamento: 1,
    nombre: "Antioquia",
  },
  {
    id_departamento: 2,
    nombre: "Cundinamarca",
  },
  {
    id_departamento: 3,
    nombre: "Valle del Cauca",
  },
  {
    id_departamento: 4,
    nombre: "Atlántico",
  },
  {
    id_departamento: 5,
    nombre: "Bolívar",
  },
  {
    id_departamento: 6,
    nombre: "Santander",
  },
  {
    id_departamento: 7,
    nombre: "Meta",
  },
];

export default dataDepartamentos;
