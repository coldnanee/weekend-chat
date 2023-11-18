import { Router } from "express";

import controller from "./token.controller";

const router = Router();

router.post("/refresh", controller.refresh);
router.post("/logout", controller.logout);

export const token = router;
