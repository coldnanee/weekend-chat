import { Router } from "express";

import UsersController from "./users.controller";

import { checkAuth } from "../auth";

import { query } from "express-validator";

const controller = UsersController;

const router = Router();

router.get(
	"/",
	[
		checkAuth,
		query("login")
			.isLength({ min: 3 })
			.withMessage(`Login can't be smaller than 3 symbols`)
	],
	controller.getUsersByLogin
);

export const users = router;
