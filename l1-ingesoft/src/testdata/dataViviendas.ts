const viviendasData=[
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

  
export default viviendasData;
export type viviendaType = typeof viviendasData[0];