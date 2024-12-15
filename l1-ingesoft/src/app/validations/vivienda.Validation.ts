import { z } from "zod";

export const viviendaUpdateSchema = z.object({
    direccion: z.string().min(1).optional(),
}).refine((data) => data.direccion !== undefined, {
    message: "Debe ingresar al menos direccion",
});