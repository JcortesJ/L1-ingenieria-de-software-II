// Importa cualquier dependencia que necesites
export const fetchPersonas = async () => {
    try {
      const response = await fetch("/api/personas", {
        method: "GET", // Aquí especificamos que es un GET
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener los datos de la API");
      }
  
      const data = await response.json();
      return { data, error: null }; // Retorna los datos y un valor null para el error
    } catch (err) {
      console.error("Error en la consulta API: ", err);
      return { data: null, error: "No se pudo cargar la información de las personas." }; // Retorna null para los datos y el error
    }
  };

  

  interface UpdatePersonaData {
    nombre: string;
    vivo: boolean;
  }
  
  export const updatePersona = async (id: number, data: UpdatePersonaData) => {
    const response = await fetch(`/api/personas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update persona');
    }
  
    return response.json();
  };
  
  