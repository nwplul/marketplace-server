import { Request, Response } from "express";
import * as UserService from "../services/user.service";

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

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  UserService.createUser({ name, email })
    .then((response) => {
      if (response) {
        return res.status(201).send({
          status: "success",
          user: response,
        });
      }

      return res.status(400).send({
        status: "error",
        message: "Nao foi possivel criar o usuario",
      });
    })
    .catch((e) =>
      res.status(500).send({
        status: 500,
        message: e.message,
      })
    );
};
