
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma"

export async function POST(request: NextRequest) {
  try {
    const { idPersona, idVivienda } = await request.json()

    const newPosee = await prisma.posee.create({
      data: {
        id_persona: idPersona,
        id_vivienda: idVivienda,
      }
    })

    return NextResponse.json(newPosee);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { message: 'Error al obtener personas', error: error.message },
        { status: 500 }
      );
    }

  }
}