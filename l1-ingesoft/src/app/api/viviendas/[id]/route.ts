
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma"
import { personaUpdateSchema } from "@/app/validations/personValidation";
import { viviendaUpdateSchema } from "@/app/validations/vivienda.Validation";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params
    try {
        const body = await request.json();
        const validBody = viviendaUpdateSchema.parse(body);

        const viviendaUpdated = await prisma.vivienda.update({
            where: { id: Number(id) },
            data: validBody
        })


        return NextResponse.json(viviendaUpdated);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al actualizar vivienda', error: error.message },
                { status: 500 }
            );
        }

    }
}