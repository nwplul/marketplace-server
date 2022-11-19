import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { z } from "zod";
import * as ItemService from "../services/item.service";

export const getItems = (req: Request, res: Response) => {
  ItemService.ListAllItems()
    .then((items) => {
      if (items) {
        res.status(200).send(items);
      } else {
        res.status(404).send("items not found");
      }
    })
    .catch((e) => res.status(500).send(e.message));
};

export const createItem = async (req: Request, res: Response) => {
  const createItemBody = z.object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
    brand: z.string(),
    url_image: z.optional(z.string()),
    rating: z.number(),
  });

  const Item = await createItemBody.safeParseAsync(req.body);

  if (!Item.success) {
    return res.status(400).send({
      message: "Type error",
      errors: Item.error.issues,
    });
  }

  ItemService.createItem(Item.data)
    .then((response) => {
      if (response) {
        return res.status(201).send({
          message: "success",
          item: response,
        });
      }

      return res.status(400).send({
        message: "Nao foi possivel criar o item",
      });
    })
    .catch((e: PrismaClientKnownRequestError) =>
      res.status(500).send({
        code: e.code,
        message: e.message,
        cause: e.meta?.target,
      })
    );
};
