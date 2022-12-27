/*
  Warnings:

  - You are about to drop the column `flavourRecommendations` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "flavourRecommendations",
ADD COLUMN     "likedFlavours" "Flavour"[];
