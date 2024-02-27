import { Router } from "express";

import { ValidationController } from "../controllers/validation";

class HealthRouter {
	public router: Router;
	private readonly controller: ValidationController = new ValidationController();

	constructor () {
		this.router = Router();
	}

	public addRoute = (route = "/validation"): void => {
		this.router.get(`${route}/private`, this.controller.privateRouter);
	};
}

const healthRouter = new HealthRouter();
healthRouter.addRoute();

export default healthRouter.router;
