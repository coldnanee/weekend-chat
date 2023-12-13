import { Router } from "express";

import controller from "./session.controller";

import { checkAuth } from "../auth";

const router = Router();

router.get("/", checkAuth, controller.getSessions);

export const session = router;
