import express, { Request, Response } from "express";
import * as Controller from "../controllers/UserController";

export const userRouter = express.Router();

userRouter.get("/users", async (req: Request, res: Response) =>
  Controller.getUsers(req, res)
);

userRouter.post("/user", async (req: Request, res: Response) => {
  Controller.createUser(req, res);
});
