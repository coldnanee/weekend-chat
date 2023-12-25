import { Router } from "express";

import controller from "./auth.controller";

import { body } from "express-validator";

const router = Router();

router.post(
	"/registration",
	[
		body("login")
			.isLength({ min: 3 })
			.withMessage(`Login can't be smaller 3 symbols`),
		body("password")
			.isLength({ min: 8 })
			.withMessage(`Password can't be smaller 8 symbols`)
	],
	controller.registration
);
router.post(
	"/login",
	[
		body("login")
			.isLength({ min: 3 })
			.withMessage(`Login can't be smaller 3 symbols`),
		body("password")
			.isLength({ min: 8 })
			.withMessage(`Password can't be smaller 8 symbols`)
	],
	controller.login
);

router.post("/reset", controller.sendResetMessage);
router.get("/reset/:link", controller.resetPassword);

export const auth = router;
