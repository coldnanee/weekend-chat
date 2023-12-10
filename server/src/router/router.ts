import { Router } from "express";

import { auth } from "../auth";
import { token } from "../token";
import { profile } from "../profile";
import { users } from "../users";
import { chats } from "../chats";
import { health } from "../health";

const routes = Router();

routes.use("/auth", auth);
routes.use("/token", token);
routes.use("/profile", profile);
routes.use("/users", users);
routes.use("/chats", chats);
routes.use("/health", health);

export const router = routes;
