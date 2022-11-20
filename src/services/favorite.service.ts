import { db } from "../utils/db.server";

export const ListAllFavorites = async () => {
  return await db.favorites.findMany({
    include: {
      Item: true,
    },
  });
};

export const createFavorite = async (item_id: string, user_id: string) => {
  return await db.favorites.create({
    data: {
      item_id,
      user_id,
    },
    include: {
      Item: true,
    },
  });
};

export const deleteFavorite = async (item_id: string, user_id: string) => {
  return await db.favorites.delete({
    where: {
      user_id_item_id: {
        item_id,
        user_id,
      },
    },
  });
};
