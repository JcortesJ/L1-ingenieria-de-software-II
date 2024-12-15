export const fetchViviendas = async () => {
  try {
    const response = await fetch("/api/viviendas", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos de viviendas");
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    console.error("Error en la consulta API: ", err);
    return { data: null, error: "No se pudo cargar los datos de viviendas." };
  }
};

export const fetchMiembrosFamilia = async (id: string) => {
  try {
    const response = await fetch("/api/viviendas", {
      method: "GET",
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Error a los habitantes del hogar");
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    console.error("Error en la consulta API: ", err);
    return { data: null, error: "No se pudo cargar los datos de viviendas." };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createVivienda = async (data: Record<string, any>) => {
  try {
    const response = await fetch("/api/viviendas/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return { data: response, error: null };
  } catch (err) {
    console.error("Error al crear la vivienda: ", err);
    return { data: null, error: "No se pudo crear la vivienda." };
  }
};
