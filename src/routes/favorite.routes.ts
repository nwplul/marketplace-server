import express, { Request, Response } from "express";
import * as FavoriteController from "../controllers/FavoriteController";

export const favoriteRouter = express.Router();

favoriteRouter.get("/favorites", async (req: Request, res: Response) => {
  FavoriteController.getFavorites(req, res);
});

favoriteRouter.post("/favorite", async (req: Request, res: Response) => {
  FavoriteController.createFavorite(req, res);
});

favoriteRouter.delete("/favorite", async (req: Request, res: Response) => {
  FavoriteController.deleteFavorite(req, res);
});
