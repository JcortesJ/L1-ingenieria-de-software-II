
import { NextResponse } from "next/server";
import { prisma } from "../../libs/prisma"

export async function GET() {
    try {
        const viviendas = await prisma.vivienda.findMany({
            include: {
                registro: {
                    where: { es_vigente: true },
                    include: {
                        registro: {
                            include: {
                                persona: true
                            }
                        }
                    }
                }
            }
        })

        const transformedViviendas = viviendas.map(vivienda => ({
            id_vivienda: vivienda.id,
            id_municipio: vivienda.id_municipio,
            direccion: vivienda.direccion,
            tipo: vivienda.tipo,
            id_cabeza_hogar: vivienda.registro[0]?.id_cdf,
            nombre_cabeza_hogar: vivienda.registro[0]?.registro.persona.nombre,
            fecha_inicio: vivienda.registro[0]?.fecha_inicio,
            fecha_fin: vivienda.registro[0]?.fecha_fin,
            esVigente: vivienda.registro[0]?.es_vigente,
        }))

        return NextResponse.json(transformedViviendas);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al obtener personas', error: error.message },
                { status: 500 }
            );
        }

    }
}