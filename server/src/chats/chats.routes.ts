import { Router } from "express";

import ChatsController from "./chats.controller";

import { checkAuth } from "../auth";

const controller = ChatsController;

const router = Router();

router.get("/", checkAuth, controller.getChats);

export const chats = router;
