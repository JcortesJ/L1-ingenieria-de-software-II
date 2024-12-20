export const fetchRegistroResidencial = async () => {
  try {
    const response = await fetch("/api/registro", {
      // provisional
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos de registro residencial");
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error:
        "No se pudo cargar los datos de registro residencial. error: " + err,
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRegistroResidencial = async (
  idCdf: number,
  idVivienda: number,
  modalidadOcupacion: string,
  fechaInicio: string,
  fechaFin: string
) => {
  try {
    const response = await fetch("/api/registro/create", {
      method: "POST",
      body: JSON.stringify({
        idCdf,
        idVivienda,
        modalidadOcupacion,
        fechaInicio,
        fechaFin,
      }),
    });
    const responseData = await response.json();
    return { data: responseData, error: null };
  } catch (err) {
    console.error("Error al crear el registro residencial: ", err);
    return {
      data: null,
      error: "No se pudo crear el registro residencial. error: " + err,
    };
  }
};
