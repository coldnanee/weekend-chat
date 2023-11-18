import { Router } from "express";

import controller from "./profile.controller";

import { checkAuth } from "../auth";

const router = Router();

router.post("/update", checkAuth, controller.updateProfile);

export const profile = router;
