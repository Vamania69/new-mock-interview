/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_questionId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correctAnswer",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userAnswers" TEXT;
