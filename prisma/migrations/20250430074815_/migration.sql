/*
  Warnings:

  - The values [PENDING,IN_PROGRESS,DONE] on the enum `serviceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "serviceStatus_new" AS ENUM ('pending', 'in_progress', 'done');
ALTER TABLE "service_records" ALTER COLUMN "status" TYPE "serviceStatus_new" USING ("status"::text::"serviceStatus_new");
ALTER TYPE "serviceStatus" RENAME TO "serviceStatus_old";
ALTER TYPE "serviceStatus_new" RENAME TO "serviceStatus";
DROP TYPE "serviceStatus_old";
COMMIT;
