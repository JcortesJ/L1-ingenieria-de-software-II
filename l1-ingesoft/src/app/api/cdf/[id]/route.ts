import { NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    try {
        const personasMantenidas = await prisma.persona.findMany({
            where: {
                id_cdf: Number(id),
            },
            select: { nombre: true }
        })

        return NextResponse.json(personasMantenidas);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al obtener personas', error: error.message },
                { status: 500 }
            );
        }

    }
}