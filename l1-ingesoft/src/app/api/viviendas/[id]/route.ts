
import { NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma"
import { viviendaUpdateSchema } from "@/app/validations/vivienda.Validation";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
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

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    try {

        const habitanPersonas = await prisma.registro_residencial.findFirst({
            where: {
                id_vivienda: Number(id),
                es_vigente: true
            }
        })

        if (habitanPersonas) {
            return Response.json(
                { message: 'Hay personas viviendo en esa vivienda' },
                { status: 500 }
            );
        }

        await prisma.vivienda.update({
            where: { id: Number(id) },
            data: { existe: false }
        })


        return NextResponse.json({
            message: "Vivienda eliminada exitosamente"
        });

    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al actualizar vivienda', error: error.message },
                { status: 500 }
            );
        }

    }
}