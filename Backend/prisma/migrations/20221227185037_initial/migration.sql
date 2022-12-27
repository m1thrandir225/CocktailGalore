-- CreateEnum
CREATE TYPE "Flavour" AS ENUM ('SWEET', 'SOUR', 'BITTER', 'SPICY', 'SMOKEY', 'SAVORY', 'HERBAL', 'FRUITY');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" "UserType" NOT NULL DEFAULT 'USER',
    "flavourRecommendations" "Flavour"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cocktail" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "ingredients" TEXT[],
    "instructions" TEXT NOT NULL,
    "flavours" "Flavour"[],

    CONSTRAINT "Cocktail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CocktailToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CocktailToUser_AB_unique" ON "_CocktailToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CocktailToUser_B_index" ON "_CocktailToUser"("B");

-- AddForeignKey
ALTER TABLE "_CocktailToUser" ADD CONSTRAINT "_CocktailToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Cocktail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CocktailToUser" ADD CONSTRAINT "_CocktailToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
