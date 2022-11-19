import { ItemProps } from "../@types/item";
import { db } from "../utils/db.server";

export const ListAllItems = async () => {
  return await db.items.findMany();
};

export const createItem = async ({ title, price }: ItemProps) => {
  return await db.items.create({
    data: { title, price },
  });
};
