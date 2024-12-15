
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma"
import { NextApiRequest } from "next";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
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