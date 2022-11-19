/*
  Warnings:

  - Added the required column `url_image` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "brand" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "url_image" TEXT NOT NULL
);
INSERT INTO "new_items" ("brand", "createdAt", "description", "id", "name", "price", "rating") SELECT "brand", "createdAt", "description", "id", "name", "price", "rating" FROM "items";
DROP TABLE "items";
ALTER TABLE "new_items" RENAME TO "items";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
