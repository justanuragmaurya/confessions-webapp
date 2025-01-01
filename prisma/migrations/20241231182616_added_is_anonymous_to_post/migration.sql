/*
  Warnings:

  - Added the required column `isAnonymous` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image" TEXT,
ADD COLUMN     "isAnonymous" BOOLEAN NOT NULL;
