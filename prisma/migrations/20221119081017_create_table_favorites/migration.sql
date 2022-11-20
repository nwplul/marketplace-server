-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favorites_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "url_image" TEXT
);
INSERT INTO "new_items" ("brand", "createdAt", "description", "id", "name", "price", "rating", "url_image") SELECT "brand", "createdAt", "description", "id", "name", "price", "rating", "url_image" FROM "items";
DROP TABLE "items";
ALTER TABLE "new_items" RENAME TO "items";
CREATE TABLE "new_purchased_items" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PURCHASED',
    CONSTRAINT "purchased_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "purchased_items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_purchased_items" ("itemId", "status", "userId") SELECT "itemId", "status", "userId" FROM "purchased_items";
DROP TABLE "purchased_items";
ALTER TABLE "new_purchased_items" RENAME TO "purchased_items";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
