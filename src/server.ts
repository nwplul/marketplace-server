import express from "express";

import { userRouter } from "./routes/user.routes";
import { itemRouter } from "./routes/item.routes";
import { favoriteRouter } from "./routes/favorite.routes";

const app = express();

app.use(express.json());

app.use("/", userRouter);
app.use("/", itemRouter);
app.use("/", favoriteRouter);

app.listen(3333, () => console.log("Server is running in port 3333!"));
