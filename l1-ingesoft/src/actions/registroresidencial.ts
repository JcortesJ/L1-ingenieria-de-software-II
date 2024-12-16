export const fetchRegistroResidencial = async () => {
  try {
    const response = await fetch("/api/registro", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos de registro residencial");
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    console.error("Error en la consulta API: ", err);
    return {
      data: null,
      error: "No se pudo cargar los datos de registro residencial.",
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRegistroResidencial = async (data: any) => {
  const response = await fetch("/api/registro/create", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear el registro residencial");
  }

  const responseData = await response.json();
  return { responseData, error: null };
};
