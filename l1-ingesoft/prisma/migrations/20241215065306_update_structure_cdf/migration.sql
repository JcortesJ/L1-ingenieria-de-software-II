/*
  Warnings:

  - Added the required column `es_vigente` to the `Registro_residencial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registro_residencial" ADD COLUMN     "es_vigente" BOOLEAN NOT NULL;
