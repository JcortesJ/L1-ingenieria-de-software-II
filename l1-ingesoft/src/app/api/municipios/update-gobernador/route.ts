
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma"

export async function PUT(request: NextRequest) {
    try {
        const {
            idPersona,
            idMunicipio
        } = await request.json();

        const gobiernaMunicipio = await prisma.municipio.findUnique({
            where: {
                id: idMunicipio,
                id_gobernante: idPersona,
            },
            select: {
                nombre: true,
                gobernante: {
                    select: { nombre: true }
                }
            }
        })

        if (gobiernaMunicipio) {
            return Response.json(
                { message: `${gobiernaMunicipio.gobernante?.nombre} ya gobierna el municipio ${gobiernaMunicipio.nombre}` },
                { status: 500 }
            );
        }

        const findMunicipio = await prisma.municipio.findUnique({ where: { id: idMunicipio } })

        if (!findMunicipio) {
            return Response.json(
                { message: `El municipio especificado no existe` },
                { status: 500 }
            );
        }

        const viveEnMunicipio = await prisma.persona.findUnique({
            where: { id: idPersona },
            include: {
                cdf: {
                    include: {
                        registro: {
                            where: { es_vigente: true },
                            select: {
                                vivienda: {
                                    select: {
                                        municipio: { select: { id: true, nombre: true } }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const municipioVivienda = viveEnMunicipio?.cdf?.registro[0]?.vivienda?.municipio;
        if (!municipioVivienda || municipioVivienda.id !== idMunicipio) {
            return Response.json(
                { message: `${viveEnMunicipio?.nombre} debe vivir en ${findMunicipio.nombre}` },
                { status: 500 }
            );
        }

        await prisma.municipio.update({
            where: {
                id: idMunicipio
            },
            data: {
                id_gobernante: idPersona
            }
        })


        return NextResponse.json(viveEnMunicipio);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al obtener personas', error: error.message },
                { status: 500 }
            );
        }

    }
}