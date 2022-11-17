/*
  Warnings:

  - You are about to drop the `buy_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `price` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "buy_items";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "purchased_items" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'WISHLIST',
    CONSTRAINT "purchased_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "release_date" DATETIME NOT NULL
);
INSERT INTO "new_items" ("id", "price", "release_date", "title") SELECT "id", "price", "release_date", "title" FROM "items";
DROP TABLE "items";
ALTER TABLE "new_items" RENAME TO "items";
CREATE UNIQUE INDEX "items_title_key" ON "items"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
