import { z } from "zod";

export const personaUpdateSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio").optional(),
    genero: z.enum(["MASCULINO", "FEMENINO", "NO_BINARIO"]).optional(),
});