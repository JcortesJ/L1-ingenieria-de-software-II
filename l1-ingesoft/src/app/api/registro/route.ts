
import { NextResponse } from "next/server";
import { prisma } from "../../libs/prisma"

export async function GET() {
    try {
        const registros = await prisma.registro_residencial.findMany({
            include: {
                vivienda: {
                    select: {
                        direccion: true
                    }
                },
                registro: {
                    select: {
                        persona: {
                            select: {
                                nombre: true
                            }
                        }
                    }
                }
            }
        })

        const transformedRegistros = registros.map(registro => {
            const { id, registro: cdf, vivienda, ...restBody } = registro
            return {
                id_registro: id,
                ...restBody,
                direccion_vivienda: vivienda.direccion,
                nombre_cdf: cdf.persona.nombre
            }

        })

        return NextResponse.json(transformedRegistros);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al obtener personas', error: error.message },
                { status: 500 }
            );
        }

    }
}