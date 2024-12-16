
import { NextResponse } from "next/server";
import { prisma } from "../../libs/prisma"

export async function GET() {
    try {
        const departamentos = await prisma.departamento.findMany({
            orderBy: { id: 'asc' }
        })

        const transformedDepartamentos = departamentos.map(departamento => ({
            id_departamento: departamento.id,
            nombre: departamento.nombre
        }))

        return NextResponse.json(transformedDepartamentos);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al obtener departamentos', error: error.message },
                { status: 500 }
            );
        }

    }
}