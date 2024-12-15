export const fetchMunicipios = async () => {
    try {
      const response = await fetch("/api/municipios", {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener los datos de municipios");
      }
  
      const data = await response.json();
      return { data, error: null };
    } catch (err) {
      console.error("Error en la consulta API: ", err);
      return { data: null, error: "No se pudo cargar los datos de municipios." };
    }
  };

  export const cambiarAlcalde = async (municipioId: number, nuevoAlcaldeId: number): Promise<void> => {
    const response = await fetch('/api/cambiar-alcalde', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ municipioId, nuevoAlcaldeId }),
    })
  
    if (!response.ok) {
      throw new Error('Failed to update alcalde')
    }
  }

  