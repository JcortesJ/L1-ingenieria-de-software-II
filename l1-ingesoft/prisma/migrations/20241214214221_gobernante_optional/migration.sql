-- DropForeignKey
ALTER TABLE "Municipio" DROP CONSTRAINT "Municipio_id_gobernante_fkey";

-- AlterTable
ALTER TABLE "Municipio" ALTER COLUMN "id_gobernante" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Municipio" ADD CONSTRAINT "Municipio_id_gobernante_fkey" FOREIGN KEY ("id_gobernante") REFERENCES "Persona"("id") ON DELETE SET NULL ON UPDATE CASCADE;
