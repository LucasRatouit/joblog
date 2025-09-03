/*
  Warnings:

  - You are about to drop the column `statusId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."JobStatus" AS ENUM ('PENDING', 'INTERVIEW', 'FOLLOW_UP', 'ACCEPTED');

-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_statusId_fkey";

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "statusId",
ADD COLUMN     "status" "public"."JobStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "public"."Status";
