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
    return {
      data: null,
      error: "No se pudo cargar la información de las personas.",
    }; // Retorna null para los datos y el error
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPersona = async (data: Record<string, any>) => {
  try {
    const response = await fetch("/api/personas/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return { data: response, error: null };
  } catch (err) {
    console.error("Error al crear la persona: ", err);
    return { data: null, error: "No se pudo crear la persona." };
  }
};
