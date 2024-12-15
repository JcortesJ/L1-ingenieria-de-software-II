-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMENINO', 'NO_BINARIO');

-- AlterTable
ALTER TABLE "Persona" ADD COLUMN     "genero" "Genero";
