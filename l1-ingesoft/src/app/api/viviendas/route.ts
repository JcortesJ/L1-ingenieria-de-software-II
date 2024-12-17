
import { NextResponse } from "next/server";
import { prisma } from "../../libs/prisma"

export async function GET() {
    try {
        const viviendas = await prisma.vivienda.findMany({
            where: { existe: true }
        })

        const transformedViviendas = viviendas.map(vivienda => ({
            id_vivienda: vivienda.id,
            id_municipio: vivienda.id_municipio,
            direccion: vivienda.direccion,
            tipo: vivienda.tipo
        }))

        return NextResponse.json(transformedViviendas);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al obtener viviendas', error: error.message },
                { status: 500 }
            );
        }

    }
}