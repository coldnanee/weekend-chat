import { Router } from "express";

import ChatsController from "./chats.controller";

import { checkAuth } from "../auth";

import { query } from "express-validator";

const controller = ChatsController;

const router = Router();

router.get("/", checkAuth, controller.getChats);
router.get(
	"/user",
	[
		checkAuth,
		query("login")
			.isLength({ min: 3 })
			.withMessage(`Login can't be smaller, than 3 symbols`)
	],
	controller.getUserInfo
);

export const chats = router;
