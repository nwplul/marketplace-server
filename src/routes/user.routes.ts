import express, { Request, Response } from "express";
import * as Controller from "../controllers/UserController";
import * as ItemController from "../controllers/ItemController";

export const userRouter = express.Router();
export const itemRouter = express.Router();

userRouter.get("/users", async (req: Request, res: Response) =>
  Controller.getUsers(req, res)
);

userRouter.post("/user", async (req: Request, res: Response) => {
  Controller.createUser(req, res);
});

itemRouter.get("/items", async (req: Request, res: Response) => {
  ItemController.getItems(req, res);
});
