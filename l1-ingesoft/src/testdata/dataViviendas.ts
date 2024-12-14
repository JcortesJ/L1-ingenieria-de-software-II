const viviendasData:ViviendaType[]=[
    {
      "id_vivienda": 1,
      "id_municipio": 101,
      "direccion": "Calle 123 #45-67",
      "tipo": "Casa",
      "id_cabeza_hogar": 5001,
      "nombre_cabeza_hogar": "Juan Pérez",
      "modalidad_ocupacion": "Propietario",
      "esVigente": true
    },
    {
      "id_vivienda": 2,
      "id_municipio": 102,
      "direccion": "Carrera 10 #20-30",
      "tipo": "Apartamento",
      "id_cabeza_hogar": 5002,
      "nombre_cabeza_hogar": "María Gómez",
      "modalidad_ocupacion": "Arrendatario",
      "esVigente": true
    },
    {
      "id_vivienda": 3,
      "id_municipio": 103,
      "direccion": "Diagonal 45 #12-34",
      "tipo": "Casa",
      "id_cabeza_hogar": 5003,
      "nombre_cabeza_hogar": "Carlos López",
      "modalidad_ocupacion": "Prestada",
      "esVigente": false
    },
    {
      "id_vivienda": 4,
      "id_municipio": 104,
      "direccion": "Transversal 67 #8A-9",
      "tipo": "Apartamento",
      "id_cabeza_hogar": 5004,
      "nombre_cabeza_hogar": "Ana Rodríguez",
      "modalidad_ocupacion": "Propietario",
      "esVigente": true
    },
    {
      "id_vivienda": 5,
      "id_municipio": 105,
      "direccion": "Calle 100 #25-50",
      "tipo": "Casa",
      "id_cabeza_hogar": 5005,
      "nombre_cabeza_hogar": "Luis Martínez",
      "modalidad_ocupacion": "Arrendatario",
      "esVigente": true
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
    esVigente: boolean; // Si la vivienda está activa o vigente
  }
  
export default viviendasData;
