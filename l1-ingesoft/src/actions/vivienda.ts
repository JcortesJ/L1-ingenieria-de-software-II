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

  export const fetchMiembrosFamilia = async (id:string) => {
    try {
      const response = await fetch("/api/viviendas", {
        method: "GET",
        body: JSON.stringify({id}),
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
