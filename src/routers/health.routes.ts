import { Router } from "express";

import { HealthController } from "../controllers/health";

class HealthRouter {
	public router: Router;
	private readonly controller: HealthController = new HealthController();

	constructor () {
		this.router = Router();
	}

	public addRoute = (route = "/"): void => {
		this.router.get(route, this.controller.index);
	};
}

const healthRouter = new HealthRouter();
healthRouter.addRoute();

export default healthRouter.router;
