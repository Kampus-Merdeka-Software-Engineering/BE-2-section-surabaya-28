/*
  Warnings:

  - Added the required column `feedback_id` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Feedback` ADD COLUMN `feedback_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`feedback_id`);
