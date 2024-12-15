
import { NextResponse } from "next/server";
import { prisma } from "../../libs/prisma"

export async function GET() {
    try {
        const municipios = await prisma.municipio.findMany({
            include: {
                departamento: true,
                gobernante: { select: { nombre: true, id: true } }
            },
            orderBy: { id: 'asc' }
        })

        const transformedMunicipios = municipios.map(municipio => ({
            id_municipio: municipio.id,
            nombre: municipio.nombre,
            departamento: municipio.departamento.nombre,
            id_departamento: municipio.id_departamento,
            nombre_gobernador: municipio.gobernante?.nombre,
            id_gobernador: municipio.id_gobernante
        }))

        return NextResponse.json(transformedMunicipios);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al obtener municipios', error: error.message },
                { status: 500 }
            );
        }

    }
}