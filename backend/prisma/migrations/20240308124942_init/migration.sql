-- CreateTable
CREATE TABLE "pogs" (
    "id" SERIAL NOT NULL,
    "pogs_name" TEXT NOT NULL,
    "ticker_symbol" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pogs_pkey" PRIMARY KEY ("id")
);
