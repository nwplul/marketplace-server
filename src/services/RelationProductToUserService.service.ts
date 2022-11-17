import { RelationProductToUserServiceProps } from "../@types/RelationProductToUserService";
import { db } from "../utils/db.server";

export const ListAllRelationProducts = async () => {
  return await db.purchasedItems.findMany();
};

export const createProduct = async (): => {
  return await db.purchasedItems.create({
    data: {
      status,
      user,
      user_id,
    },
  });
};
