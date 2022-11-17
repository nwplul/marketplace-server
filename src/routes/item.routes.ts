import express, { Request, Response } from "express";
import * as ItemController from "../controllers/ItemController";

export const itemRouter = express.Router();

itemRouter.get("/items", async (req: Request, res: Response) => {
  ItemController.getItems(req, res);
});

itemRouter.post("/item", async (req: Request, res: Response) => {
  ItemController.createItem(req, res);
});
