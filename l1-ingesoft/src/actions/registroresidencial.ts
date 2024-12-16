export const fetchRegistroResidencial = async () => {
  try {
    const response = await fetch("/api/registroresidencial", {
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
