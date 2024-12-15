// pages/api/createPersonaCdf.js

import { NextRequest } from "next/server";
import { prisma } from "../../../libs/prisma"

export async function POST(request: NextRequest) {
    try {
        const { direccion, tipo, idMunicipio , idPersona} = await request.json();

        const newVivienda = await prisma.vivienda.create({
            data: {
                direccion: direccion,
                tipo: tipo,
                id_municipio: idMunicipio,
                Posee: {
                    create: {
                        id_persona: idPersona
                    }
                }
            },
            
        });

        return Response.json(
            { message: 'Vivienda creada correctamente', newVivienda },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return Response.json(
                { message: 'Error al crear vivienda', error: error.message },
                { status: 500 }
            );
        }

    } 
}
