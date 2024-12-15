-- CreateTable
CREATE TABLE "Persona" (
    "id" SERIAL NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "id_cdf" INTEGER,
    "id_vivienda" INTEGER NOT NULL,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cdf" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "id_persona" INTEGER NOT NULL,

    CONSTRAINT "Cdf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vivienda" (
    "id" SERIAL NOT NULL,
    "direccion" VARCHAR(200) NOT NULL,
    "tipo" VARCHAR(200) NOT NULL,
    "id_municipio" INTEGER NOT NULL,

    CONSTRAINT "Vivienda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posee" (
    "id_persona" INTEGER NOT NULL,
    "id_vivienda" INTEGER NOT NULL,

    CONSTRAINT "Posee_pkey" PRIMARY KEY ("id_persona","id_vivienda")
);

-- CreateTable
CREATE TABLE "Municipio" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(200) NOT NULL,
    "id_gobernante" INTEGER NOT NULL,
    "id_departamento" INTEGER NOT NULL,

    CONSTRAINT "Municipio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departamento" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(200) NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registro_residencial" (
    "id" SERIAL NOT NULL,
    "modalidad_ocupacion" VARCHAR(200) NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3),
    "es_vigente" BOOLEAN NOT NULL,
    "id_cdf" INTEGER NOT NULL,
    "id_vivienda" INTEGER NOT NULL,

    CONSTRAINT "Registro_residencial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PersonaPosee" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PersonaPosee_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cdf_id_persona_key" ON "Cdf"("id_persona");

-- CreateIndex
CREATE UNIQUE INDEX "Municipio_id_gobernante_key" ON "Municipio"("id_gobernante");

-- CreateIndex
CREATE UNIQUE INDEX "Registro_residencial_id_cdf_key" ON "Registro_residencial"("id_cdf");

-- CreateIndex
CREATE UNIQUE INDEX "Registro_residencial_id_vivienda_key" ON "Registro_residencial"("id_vivienda");

-- CreateIndex
CREATE INDEX "_PersonaPosee_B_index" ON "_PersonaPosee"("B");

-- AddForeignKey
ALTER TABLE "Persona" ADD CONSTRAINT "Persona_id_cdf_fkey" FOREIGN KEY ("id_cdf") REFERENCES "Cdf"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Persona" ADD CONSTRAINT "Persona_id_vivienda_fkey" FOREIGN KEY ("id_vivienda") REFERENCES "Vivienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cdf" ADD CONSTRAINT "Cdf_id_persona_fkey" FOREIGN KEY ("id_persona") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vivienda" ADD CONSTRAINT "Vivienda_id_municipio_fkey" FOREIGN KEY ("id_municipio") REFERENCES "Municipio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posee" ADD CONSTRAINT "Posee_id_persona_fkey" FOREIGN KEY ("id_persona") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posee" ADD CONSTRAINT "Posee_id_vivienda_fkey" FOREIGN KEY ("id_vivienda") REFERENCES "Vivienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipio" ADD CONSTRAINT "Municipio_id_gobernante_fkey" FOREIGN KEY ("id_gobernante") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipio" ADD CONSTRAINT "Municipio_id_departamento_fkey" FOREIGN KEY ("id_departamento") REFERENCES "Departamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro_residencial" ADD CONSTRAINT "Registro_residencial_id_cdf_fkey" FOREIGN KEY ("id_cdf") REFERENCES "Cdf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro_residencial" ADD CONSTRAINT "Registro_residencial_id_vivienda_fkey" FOREIGN KEY ("id_vivienda") REFERENCES "Vivienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonaPosee" ADD CONSTRAINT "_PersonaPosee_A_fkey" FOREIGN KEY ("A") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonaPosee" ADD CONSTRAINT "_PersonaPosee_B_fkey" FOREIGN KEY ("B") REFERENCES "Vivienda"("id") ON DELETE CASCADE ON UPDATE CASCADE;
