// Importa cualquier dependencia que necesites
export const fetchPersonas = async () => {
  try {
    const response = await fetch("/api/persona", {
      method: "GET", // Aquí especificamos que es un GET
    });
    const data = await response.json();
    return { data, error: null }; // Retorna los datos y un valor null para el error
  } catch (err) {
    console.error("Error en la consulta API: ", err);
    return {
      data: null,
      error: "No se pudo cargar la información de las personas. error: " + err,
    }; // Retorna null para los datos y el error
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPersona = async (data: Record<string, any>) => {
  try {
    const response = await fetch("/api/persona/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log("la response de createPersona", response);
    return { data: response, error: null };
  } catch (err) {
    console.error("Error al crear la persona: ", err);
    return {
      data: null,
      error: "No se pudo crear la persona. error: " + err,
    };
  }
};

interface UpdatePersonaData {
  nombre: string;
  genero: string;
}

export const updatePersona = async (id: number, data: UpdatePersonaData) => {
  const response = await fetch(`/api/persona/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
// actions/viviendas.ts

export async function getViviendasVacias() {
  try {
    const response = await fetch("/api/viviendas/disponibles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching empty houses:", error);
    return { data: null, error: (error as Error).message };
  }
}

export const fetchMiembrosFamilia = async (id: number) => {
  try {
    const response = await fetch(`/api/cdf/${id}`, {
      method: "GET",
    });

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    console.error("Error en la consulta API: ", err);
    return {
      data: null,
      error: "No se pudo cargar los datos ." + err,
    };
  }
};

export const getCdf = async (id: number) => {
  try {
    const response = await fetch(`/api/cdf/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: "No se pudo cargar los datos ." + err };
  }
};
