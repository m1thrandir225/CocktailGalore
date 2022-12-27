/*
  Warnings:

  - Added the required column `timeToMake` to the `Cocktail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cocktail" ADD COLUMN     "timeToMake" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insight" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" JSONB NOT NULL,
    "authorId" INTEGER NOT NULL,
    "readTime" INTEGER NOT NULL,

    CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InsightToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InsightToUser_AB_unique" ON "_InsightToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_InsightToUser_B_index" ON "_InsightToUser"("B");

-- AddForeignKey
ALTER TABLE "Insight" ADD CONSTRAINT "Insight_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InsightToUser" ADD CONSTRAINT "_InsightToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Insight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InsightToUser" ADD CONSTRAINT "_InsightToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
