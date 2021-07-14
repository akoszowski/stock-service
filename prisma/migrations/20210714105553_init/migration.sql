-- CreateTable
CREATE TABLE "Instrument" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "baseCurrency" TEXT,
    "quoteCurrency" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "source" TEXT,
    "instrumentId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instrument.ticker_unique" ON "Instrument"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "date_instrumentId_unique_constraint" ON "Price"("date", "instrumentId");

-- AddForeignKey
ALTER TABLE "Price" ADD FOREIGN KEY ("instrumentId") REFERENCES "Instrument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
