import { Router } from "express";

import ChatsController from "./chats.controller";

import { checkAuth } from "../auth";

const controller = ChatsController;

const router = Router();

router.get("/", checkAuth, controller.getChats);
router.get("/:login", checkAuth, controller.getChatByLogin);

export const chats = router;
