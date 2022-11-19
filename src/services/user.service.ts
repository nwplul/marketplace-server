import { UserProps } from "../@types/User";
import { db } from "../utils/db.server";

export const ListAllUsers = async () => {
  return await db.user.findMany();
};

export const createUser = async ({ name, email }: UserProps) => {
  return await db.user.create({
    data: {
      name,
      email,
    },
  });
};
