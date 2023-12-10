import { Router } from "express";

import controller from "./health.controller";

const router = Router();

router.get("/check", controller.checkHealth);

export const health = router;
