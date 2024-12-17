
import { NextResponse } from "next/server";
import { prisma } from "../../libs/prisma"

export async function GET() {
    try {
        const cdfs = await prisma.cdf.findMany({
            include: {
                persona: {
                    select: { nombre: true }
                }
            }
        })

        const transformedCdf = cdfs.map(cdf => ({
            id_cdf: cdf.id,
            id_persona: cdf.id_persona,
            nombre: cdf.persona.nombre

        }))

        return NextResponse.json(transformedCdf);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al obtener cabezas de familia', error: error.message },
                { status: 500 }
            );
        }

    }
}