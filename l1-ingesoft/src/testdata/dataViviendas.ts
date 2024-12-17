export default interface ViviendaType {
  id_vivienda: number; // ID único de la vivienda
  id_municipio: number; // ID del municipio donde está ubicada la vivienda
  nombre_municipio: string;
  direccion: string; // Dirección completa de la vivienda
  tipo: "Casa" | "Apartamento" | "Conjunto"; // Tipo de vivienda (puedes agregar más opciones si es necesario)
}
