// pages/api/createPersonaCdf.js

import { NextRequest } from "next/server";
import { prisma } from "../../../libs/prisma"

export async function POST(request: NextRequest) {
    try {
        const {
            fechaNacimiento,
            nombre,
            genero,
            isCdf,
            idCdf,
            idVivienda,
            modalidadOcupacion,
            fechaInicio,
            fechaFin
        } = await request.json();

        if (!isCdf && idCdf == undefined) {
            return Response.json(
                { message: 'Debe asociarle un cabeza de familia a la persona' },
                { status: 500 }
            );
        }

        if (idVivienda) {
            if (!fechaInicio || !modalidadOcupacion) {
                return Response.json(
                    { message: 'No ha proporcionado todos los datos' },
                    { status: 500 }
                );
            }

            const viviendaExiste = await prisma.vivienda.findFirst({
                where: {
                    id: idVivienda,
                    existe: true
                }
            })

            if (!viviendaExiste) {
                return Response.json(
                    { message: 'Esta vivienda no existe' },
                    { status: 500 }
                );
            }

            const findSome = await prisma.registro_residencial.findFirst({
                where: {
                    id_vivienda: idVivienda,
                    es_vigente: true,
                    vivienda: { existe: true }
                }
            })

            if (findSome) {
                return Response.json(
                    { message: 'La vivienda ya esta habitada' },
                    { status: 500 }
                );
            }

        }

        let newPersona = await prisma.persona.create({
            data: {
                nombre: nombre,
                fecha_nacimiento: new Date(fechaNacimiento),
                genero: genero,
                id_cdf: idCdf
            },
        });

        if (isCdf) {
            const cdf = await prisma.cdf.create({
                data: {
                    persona: {
                        connect: { id: newPersona.id },
                    },
                    ...(idVivienda && {
                        registro: {
                            create: {
                                modalidad_ocupacion: modalidadOcupacion,
                                fecha_inicio: new Date(fechaInicio),
                                fecha_fin: fechaFin ? new Date(fechaFin) : null,
                                id_vivienda: idVivienda,
                                es_vigente: true
                            }
                        }
                    })
                },
            });

            newPersona = await prisma.persona.update({
                where: { id: newPersona.id },
                data: { id_cdf: cdf.id },
            });

        }

        return Response.json(
            { message: 'Persona y CDF creados correctamente', data: newPersona },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al crear Persona y CDF', error: error.message },
                { status: 500 }
            );
        }

    }
}
