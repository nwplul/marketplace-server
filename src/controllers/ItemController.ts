import { Request, Response } from "express";
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

export const createItem = (req: Request, res: Response) => {
  const { id, title, price, image } = req.body;

  ItemService.createItem({ id, title, price, image })
    .then((response) => {
      if (response) {
        return res.status(201).send({
          status: "success",
          item: response,
        });
      }

      return res.status(400).send({
        status: "error",
        message: "Nao foi possivel criar o item",
      });
    })
    .catch((e) =>
      res.status(500).send({
        status: 500,
        message: e.message,
      })
    );
};
