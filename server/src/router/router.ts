import { Router } from "express";

import { auth } from "../auth";
import { token } from "../token";
import { profile } from "../profile";

const routes = Router();

routes.use("/auth", auth);
routes.use("/token", token);
routes.use("/profile", profile);

export const router = routes;
