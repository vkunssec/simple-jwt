import cors from "cors";
import express, { Router } from "express";
import helmet from "helmet";

import { PORT } from "./config";
import logger from "./core/utils/logger";

class App {
	readonly app: express.Application;

	constructor() {
		this.app = express();
	}

	/* istanbul ignore next -- @preserve */
	public startServer(port?: number): void {
		const actualPort = process.env.NODE_ENV == "test" ? 0 : PORT ?? port;

		this.app.listen(actualPort, () => {
			if (process.env.NODE_ENV !== "test") logger.info(`Listing port ${actualPort}`);
		});
	}

	public addRouter(router: Router): void {
		this.app.use(express.json());
		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(router);
	}
}

export default App;
