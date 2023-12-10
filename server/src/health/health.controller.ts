import type { Request, Response, NextFunction } from "express";

class HealthController {
	checkHealth(req: Request, res: Response, next: NextFunction) {
		try {
			res.json({ message: "ok!" });
		} catch (e) {
			next(e);
		}
	}
}

export default new HealthController();
