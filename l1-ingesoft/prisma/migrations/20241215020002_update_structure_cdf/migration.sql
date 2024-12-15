/*
  Warnings:

  - You are about to drop the column `descripcion` on the `Cdf` table. All the data in the column will be lost.
  - You are about to drop the column `es_vigente` on the `Registro_residencial` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Persona" DROP CONSTRAINT "Persona_id_vivienda_fkey";

-- AlterTable
ALTER TABLE "Cdf" DROP COLUMN "descripcion";

-- AlterTable
ALTER TABLE "Registro_residencial" DROP COLUMN "es_vigente";
