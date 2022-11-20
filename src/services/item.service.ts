import { ItemProps } from "../@types/Item";
import { db } from "../utils/db.server";

export const ListAllItems = async () => {
  return await db.item.findMany();
};

export const createItem = async ({
  name,
  price,
  description,
  brand,
  url_image,
  rating,
}: ItemProps) => {
  return await db.item.create({
    data: { name, price, description, brand, url_image, rating },
  });
};
