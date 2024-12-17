
import { NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma"

export async function GET() {
    try {
        const viviendas = await prisma.vivienda.findMany({
            where: {
                existe: true,
                OR: [
                    {
                        registro: { none: {} }
                    },
                    {
                        registro: { none: { es_vigente: true } }
                    }
                ]
            }
        })

        const transformedViviendas = viviendas.map(vivienda => {
            const { id, ...restBody } = vivienda
            return {
                id_vivienda: id,
                ...restBody
            }
        })

        return NextResponse.json(transformedViviendas);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al obtener viviendas disponibles', error: error.message },
                { status: 500 }
            );
        }

    }
}