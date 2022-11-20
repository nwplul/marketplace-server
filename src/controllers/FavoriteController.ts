import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { z } from "zod";
import * as FavoriteService from "../services/favorite.service";

export const getFavorites = (req: Request, res: Response) => {
  FavoriteService.ListAllFavorites()
    .then((favorites) => {
      if (favorites) {
        res.status(200).send(favorites);
      } else {
        res.status(404).send("items not found");
      }
    })
    .catch((e) => res.status(500).send(e.message));
};

export const createFavorite = async (req: Request, res: Response) => {
  const createFavoriteBody = z.object({
    user_id: z.string().uuid(),
    item_id: z.string().uuid(),
  });

  const Favorite = await createFavoriteBody.safeParseAsync(req.body);

  if (!Favorite.success) {
    return res.status(400).send({
      message: "Type error",
      errors: Favorite.error.issues,
    });
  }

  const { item_id, user_id } = Favorite.data;

  FavoriteService.createFavorite(item_id, user_id)
    .then((response) => {
      if (response) {
        return res.status(201).send({
          message: "success",
          favorite: response,
        });
      }

      return res.status(400).send({
        message: "Nao foi possivel adicionar o item aos favoritos",
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

export const deleteFavorite = async (req: Request, res: Response) => {
  const deleteFavoriteBody = z.object({
    user_id: z.string().uuid(),
    item_id: z.string().uuid(),
  });

  const Favorite = await deleteFavoriteBody.safeParseAsync(req.body);

  if (!Favorite.success) {
    return res.status(400).send({
      message: "Type error",
      errors: Favorite.error.issues,
    });
  }

  const { item_id, user_id } = Favorite.data;

  FavoriteService.deleteFavorite(item_id, user_id)
    .then((response) => {
      if (response) {
        return res.status(201).send({
          message: "success",
          favorite: response,
        });
      }

      return res.status(400).send({
        message: "Nao foi possivel remover o item dos favoritos",
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
