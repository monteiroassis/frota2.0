-- CreateTable
CREATE TABLE "Manifest" (
    "id" SERIAL NOT NULL,
    "motorista" TEXT,
    "veiculo" TEXT,
    "cidadeOrigem" TEXT,
    "cidadeDestino" TEXT,
    "receitaTransportada" DOUBLE PRECISION,
    "custoTotal" DOUBLE PRECISION,
    "valorLucro" DOUBLE PRECISION,
    "kmRodado" DOUBLE PRECISION,
    "data" TEXT,
    "cliente" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manifest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreightMargin" (
    "id" SERIAL NOT NULL,
    "origem" TEXT,
    "destino" TEXT,
    "valorFrete" DOUBLE PRECISION,
    "totalDespesas" DOUBLE PRECISION,
    "margem" DOUBLE PRECISION,
    "margemPercentual" DOUBLE PRECISION,
    "pagador" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FreightMargin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "tipo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleStatus" (
    "id" SERIAL NOT NULL,
    "placa" TEXT,
    "operacao" TEXT,
    "updated_at" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleStatus_pkey" PRIMARY KEY ("id")
);
