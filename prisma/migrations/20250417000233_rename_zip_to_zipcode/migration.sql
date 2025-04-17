/*
  Warnings:

  - You are about to drop the column `zip` on the `Addresses` table. All the data in the column will be lost.
  - Added the required column `zipcode` to the `Addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Rename zip to zipcode
ALTER TABLE "Addresses" RENAME COLUMN "zip" TO "zipcode";

