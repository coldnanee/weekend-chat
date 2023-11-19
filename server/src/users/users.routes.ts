import { Router } from "express";

import UsersController from "./users.controller";

import { checkAuth } from "../auth";

const controller = UsersController;

const router = Router();

router.get("/", checkAuth, controller.getUsersByLogin);

export const users = router;
