const viviendasData:ViviendaType[]=[
  {
    "id_vivienda": 1,
    "id_municipio": 101,
    "direccion": "Calle 15 # 45-67, Bogotá",
    "tipo": "Casa",
    "id_cabeza_hogar": 12345,
    "nombre_cabeza_hogar": "Carlos Pérez",
    "modalidad_ocupacion": "Propietario",
    "fecha_inicio": "2020-01-01",
    "fecha_fin": "2025-01-01",
    "esVigente": true
  },
  {
    "id_vivienda": 2,
    "id_municipio": 102,
    "direccion": "Carrera 25 # 30-45, Medellín",
    "tipo": "Apartamento",
    "id_cabeza_hogar": 67890,
    "nombre_cabeza_hogar": "Ana Gómez",
    "modalidad_ocupacion": "Arrendatario",
    "fecha_inicio": "2022-03-15",
    "fecha_fin": "2023-03-15",
    "esVigente": false
  },
  {
    "id_vivienda": 3,
    "id_municipio": 103,
    "direccion": "Avenida El Parque # 12-34, Cali",
    "tipo": "Casa",
    "id_cabeza_hogar": 11223,
    "nombre_cabeza_hogar": "Luis Martínez",
    "modalidad_ocupacion": "Prestada",
    "fecha_inicio": "2023-05-01",
    "fecha_fin": "2024-05-01",
    "esVigente": true
  },
  {
    "id_vivienda": 4,
    "id_municipio": 104,
    "direccion": "Calle 50 # 18-90, Barranquilla",
    "tipo": "Apartamento",
    "id_cabeza_hogar": 33445,
    "nombre_cabeza_hogar": "María Rodríguez",
    "modalidad_ocupacion": "Arrendatario",
    "fecha_inicio": "2021-06-10",
    "fecha_fin": "2022-06-10",
    "esVigente": false
  },
  {
    "id_vivienda": 5,
    "id_municipio": 105,
    "direccion": "Carrera 40 # 12-45, Bucaramanga",
    "tipo": "Casa",
    "id_cabeza_hogar": 55667,
    "nombre_cabeza_hogar": "Jorge Díaz",
    "modalidad_ocupacion": "Propietario",
    "fecha_inicio": "2019-11-25",
    "fecha_fin": "2029-11-25",
    "esVigente": true
  },
  {
    "id_vivienda": 6,
    "id_municipio": 106,
    "direccion": "Avenida Las Palmas # 7-56, Cartagena",
    "tipo": "Apartamento",
    "id_cabeza_hogar": 77889,
    "nombre_cabeza_hogar": "Pedro Ramírez",
    "modalidad_ocupacion": "Arrendatario",
    "fecha_inicio": "2024-02-01",
    "fecha_fin": "2025-02-01",
    "esVigente": true
  },
  {
    "id_vivienda": 7,
    "id_municipio": 107,
    "direccion": "Calle 5 # 10-23, Medellín",
    "tipo": "Casa",
    "id_cabeza_hogar": 99100,
    "nombre_cabeza_hogar": "Lucía Hernández",
    "modalidad_ocupacion": "Prestada",
    "fecha_inicio": "2022-09-15",
    "fecha_fin": "2023-09-15",
    "esVigente": false
  }
]


export interface ViviendaType {
    id_vivienda: number; // ID único de la vivienda
    id_municipio: number; // ID del municipio donde está ubicada la vivienda
    direccion: string; // Dirección completa de la vivienda
    tipo: "Casa" | "Apartamento"; // Tipo de vivienda (puedes agregar más opciones si es necesario)
    id_cabeza_hogar: number; // ID de la persona cabeza del hogar
    nombre_cabeza_hogar: string; // Nombre de la persona cabeza del hogar
    modalidad_ocupacion: "Propietario" | "Arrendatario" | "Prestada"; // Modalidad de ocupación de la vivienda
    fecha_inicio: string; // Fecha de inicio de la ocupación de la vivienda
    fecha_fin: string; // Fecha de fin de la ocupación de la vivienda
    esVigente: boolean; // Si la vivienda está activa o vigente
  }
  
export default viviendasData;
