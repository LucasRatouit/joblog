-- CreateTable
CREATE TABLE "public"."Job" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "statusId" UUID NOT NULL,
    "location" TEXT,
    "description" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "candidacyDate" TIMESTAMP(3),
    "interviewDate" TIMESTAMP(3),
    "followUpDate" TIMESTAMP(3),

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Status" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
