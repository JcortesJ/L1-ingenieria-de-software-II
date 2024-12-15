
const dataPersonas=[
  {
    "id": 1,
    "id_cabeza_familia": 1,
    "nombre": "Ana Martínez",
    "fecha_nacimiento": "10/12/1995",
    "vivo": true,
    "numCasas": 0,
    "departamento": "Antioquia",
    "municipio": "Envigado"
  },
  {
    "id": 2,
    "id_cabeza_familia": 1,
    "nombre": "Carlos Gómez",
    "fecha_nacimiento": "15/03/1989",
    "vivo": true,
    "numCasas": 1,
    "departamento": "Cundinamarca",
    "municipio": "Chía"
  },
  {
    "id": 3,
    "id_cabeza_familia": 3,
    "nombre": "Laura Torres",
    "fecha_nacimiento": "22/07/1992",
    "vivo": false,
    "numCasas": 2,
    "departamento": "Valle del Cauca",
    "municipio": "Cali"
  },
  {
    "id": 4,
    "id_cabeza_familia": 1,
    "nombre": "José Ramírez",
    "fecha_nacimiento": "09/11/1985",
    "vivo": true,
    "numCasas": 3,
    "departamento": "Atlántico",
    "municipio": "Barranquilla"
  },
  {
    "id": 5,
    "id_cabeza_familia": 5,
    "nombre": "María Pérez",
    "fecha_nacimiento": "01/05/1978",
    "vivo": false,
    "numCasas": 0,
    "departamento": "Bolívar",
    "municipio": "Cartagena"
  },
  {
    "id": 6,
    "id_cabeza_familia": 1,
    "nombre": "Luis Morales",
    "fecha_nacimiento": "18/08/2000",
    "vivo": true,
    "numCasas": 1,
    "departamento": "Santander",
    "municipio": "Bucaramanga"
  },
  {
    "id": 7,
    "id_cabeza_familia": 7,
    "nombre": "Elena Fernández",
    "fecha_nacimiento": "27/02/1993",
    "vivo": true,
    "numCasas": 2,
    "departamento": "Risaralda",
    "municipio": "Pereira"
  },
  {
    "id": 8,
    "id_cabeza_familia": 5,
    "nombre": "Andrés López",
    "fecha_nacimiento": "05/06/1982",
    "vivo": false,
    "numCasas": 4,
    "departamento": "Córdoba",
    "municipio": "Montería"
  },
  {
    "id": 9,
    "id_cabeza_familia": 7,
    "nombre": "Claudia Ríos",
    "fecha_nacimiento": "14/09/1997",
    "vivo": true,
    "numCasas": 0,
    "departamento": "Meta",
    "municipio": "Villavicencio"
  },
  {
    "id": 10,
    "id_cabeza_familia": 10,
    "nombre": "Francisco Sánchez",
    "fecha_nacimiento": "23/12/1990",
    "vivo": true,
    "numCasas": 1,
    "departamento": "Nariño",
    "municipio": "Pasto"
  }
]
export interface PersonaType {
  id: number; // ID único de la persona
  id_cabeza_familia: number; // ID de la persona cabeza de familia
  nombre: string; // Nombre de la persona
  fecha_nacimiento: string; // Fecha de nacimiento en formato "DD/MM/AAAA"
  vivo: boolean; // Si la persona está viva o no
  numCasas: number; // Número de casas que posee
  departamento: string; // Departamento de residencia
  municipio: string; // Municipio de residencia
}


export default dataPersonas