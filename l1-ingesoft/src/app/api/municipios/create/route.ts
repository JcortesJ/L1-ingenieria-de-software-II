// pages/api/createPersonaCdf.js

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma"

export async function POST(request: NextRequest) {
    try {
        const { nombre, idGobernante, idDepartamento } = await request.json();

        if (!idDepartamento) {
            return NextResponse.json(
                { message: 'No se ha asociado un departamento'},
                { status: 500 }
            );
        }

        const municipio = await prisma.municipio.create({
            data: {
                nombre: nombre,
                id_gobernante: idGobernante ?? null,
                id_departamento: idDepartamento
            }
        });

        return Response.json(
            { message: 'Municipio correctamente', data: municipio },
            { status: 201 }
        );
    } catch (error: any) {
        // console.log('Error al crear municipio', error);
        if (error instanceof Error) {
            return NextResponse.json(
                { message: 'Error al crear municipio', error: error.message },
                { status: 500 }
            );
        }
    }
}
