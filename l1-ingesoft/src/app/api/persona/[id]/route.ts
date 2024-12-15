
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma"
import { personaUpdateSchema } from "@/app/validations/personValidation";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params
    try {
        const body = await request.json();
        const validBody = personaUpdateSchema.parse(body);

        const personaUpdated = await prisma.persona.update({
            where: { id: Number(id) },
            data: validBody
        })


        return NextResponse.json(personaUpdated);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al actualizar persona', error: error.message },
                { status: 500 }
            );
        }

    }
}