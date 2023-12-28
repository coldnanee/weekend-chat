import { Router } from "express";

import controller from "./profile.controller";

import { checkAuth } from "../auth";

import { body } from "express-validator";

const router = Router();

router.post(
	"/update",
	checkAuth,
	[
		body("login")
			.isLength({ min: 3 })
			.withMessage(`Login can't be smaller 3 symbols`)
	],
	controller.updateProfile
);

router.get("/settings", checkAuth, controller.getProfileSettings);

export const profile = router;
