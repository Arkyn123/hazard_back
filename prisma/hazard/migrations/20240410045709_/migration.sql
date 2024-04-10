-- CreateTable
CREATE TABLE "hazard" (
    "createdBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER NOT NULL DEFAULT 0,
    "deletedBy" INTEGER,
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "probability" INTEGER NOT NULL,
    "severity" INTEGER NOT NULL,
    "ps" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "usedInQs" BOOLEAN NOT NULL DEFAULT false,
    "question" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "hazard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hazard_type" (
    "createdBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER NOT NULL DEFAULT 0,
    "deletedBy" INTEGER,
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "hazard_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parameter" (
    "createdBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER NOT NULL DEFAULT 0,
    "deletedBy" INTEGER,
    "id" SERIAL NOT NULL,
    "hazard_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "comment" VARCHAR(255),
    "measurements" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "substance" (
    "createdBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER NOT NULL DEFAULT 0,
    "deletedBy" INTEGER,
    "id" SERIAL NOT NULL,
    "hazard_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "substance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hazard" ADD CONSTRAINT "hazard_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "hazard_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parameter" ADD CONSTRAINT "parameter_hazard_id_fkey" FOREIGN KEY ("hazard_id") REFERENCES "hazard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substance" ADD CONSTRAINT "substance_hazard_id_fkey" FOREIGN KEY ("hazard_id") REFERENCES "hazard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
