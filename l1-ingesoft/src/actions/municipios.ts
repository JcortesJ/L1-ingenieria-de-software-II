export const fetchMunicipios = async () => {
    try {
      const response = await fetch("/api/municipios", {
        method: "GET",
      });
  
      if (!response.ok) {
        const message = response.statusText;
        throw new Error(message);
      }
  
      const data = await response.json();
      return { data, error: null };
    } catch (err) {
      console.error("Error en la consulta API: ", err);
      return { data: null, error: (err as Error).message };
    }
  };
  export const cambiarAlcalde = async (municipioId: number, nuevoAlcaldeId: number): Promise<void> => {
    try {
      const response = await fetch('/api/municipios/update-gobernador', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idPersona: nuevoAlcaldeId, idMunicipio: municipioId }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error inesperado');
      }
    } catch (error) {
      // Log adicional o transformación del error
      console.error('Error en cambiarAlcalde:', error);
      if (error instanceof Error) {
        throw new Error(error.message || 'Error en cambiar alcalde');
      } else {
        throw new Error('Error en cambiar alcalde');
      }
    }
  };
  
  