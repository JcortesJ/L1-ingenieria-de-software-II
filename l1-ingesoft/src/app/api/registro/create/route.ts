
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma"

export async function POST(request: NextRequest) {
    try {
        const {
            idVivienda,
            idCdf,
            modalidadOcupacion,
            fechaInicio,
            fechaFin
        } = await request.json();

        const viviendaOcupada = await prisma.registro_residencial.findFirst({
            where: {
                id_vivienda: idVivienda,
                es_vigente: true
            }
        })

        if (viviendaOcupada) {
            return Response.json(
                { message: 'Esta vivienda ya esta ocupada' },
                { status: 500 }
            );
        }

        const registroExistente = await prisma.registro_residencial.findFirst({
            where: {
                id_cdf: idCdf,
                es_vigente: true
            },
        });

        if (registroExistente) {

            await prisma.registro_residencial.update({
                where: {
                    id: registroExistente.id,
                },
                data: {
                    es_vigente: false,
                },
            });
        }

        const poseeVivienda = await prisma.posee.findFirst({
            where: {
                id_vivienda: idVivienda,
                persona: {
                    cdf: {
                        id: idCdf
                    }
                }
            }
        })

        const registroNuevo = await prisma.registro_residencial.create({
            data: {
                modalidad_ocupacion: !poseeVivienda ? modalidadOcupacion : "PROPIO",
                fecha_inicio: new Date(fechaInicio),
                fecha_fin: fechaFin ? new Date(fechaFin) : null,
                id_cdf: idCdf,
                id_vivienda: idVivienda,
                es_vigente: true,
            }
        })


        return NextResponse.json(registroNuevo);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al obtener personas', error: error.message },
                { status: 500 }
            );
        }

    }
}