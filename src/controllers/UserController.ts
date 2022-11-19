import { Request, Response } from "express";
import * as UserService from "../services/user.service";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export const getUsers = (req: Request, res: Response) => {
  UserService.ListAllUsers()
    .then((users) => {
      if (users) {
        res.status(200).send(users);
      } else {
        res.status(404).send("Users not found");
      }
    })
    .catch((e) => res.status(500).send(e.message));
};

export const createUser = async (req: Request, res: Response) => {
  const createUserBody = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  const User = await createUserBody.safeParseAsync(req.body);

  if (!User.success) {
    return res.status(400).send({
      message: "Type error",
      errors: User.error.issues,
    });
  }

  UserService.createUser(User.data)
    .then((response) => {
      if (response) {
        return res.status(201).send({
          message: "success",
          user: response,
        });
      }

      return res.status(400).send({
        message: "Nao foi possivel criar o usuario",
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
