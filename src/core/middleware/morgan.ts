import { Request, Response, Router } from "express";
import morgan from "morgan";

class Morgan {
	public router: Router;

	constructor() {
		this.router = Router();
	}

	public addRoute(): void {
		// 1.1 status_code=200 GET=/iplookup/10.0.0.1 response_latency=1.793
		this.router.use(morgan((tokens: any, req: Request, res: Response) => {
			return [
				tokens["http-version"](req, res),
				`status_code=${tokens.status(req, res)}`,
				`${tokens.method(req, res)}=${tokens.url(req, res)}`,
				`response_latency=${tokens["response-time"](req, res)} ms`
			].join(" ");
		}));
	}
}

const morganMiddleware = new Morgan();
morganMiddleware.addRoute();

export default morganMiddleware.router;
