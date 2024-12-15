
import { NextResponse } from "next/server";
import { prisma } from "../../libs/prisma"

export async function GET() {
  try {
    const persons = await prisma.persona.findMany({
      include: {
        Posee: true,
        cdf: {
          include: {
            registro: {
              take: 1,
              where: {
                es_vigente: true,
              },
              select: {
                vivienda: {
                  select: {
                    municipio: {
                      select: {
                        nombre: true,
                        departamento: {
                          select: {
                            nombre: true,
                          },
                        },
                      },
                    },
                  },
                },
              }
            }
          }
        }
      }
    })

    const transformedPersons = persons.map(person => ({
      id: person.id,
      id_cabeza_familia: person.id_cdf,
      nombre: person.nombre,
      fecha_nacimiento: person.fecha_nacimiento,
      vivo: true,
      departamento: person.cdf?.registro[0]?.vivienda.municipio.departamento.nombre,
      municipio: person.cdf?.registro[0]?.vivienda.municipio.nombre,
      numCasas: person.Posee.length

    }))

    return NextResponse.json(transformedPersons);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { message: 'Error al obtener personas', error: error.message },
        { status: 500 }
      );
    }

  }
}