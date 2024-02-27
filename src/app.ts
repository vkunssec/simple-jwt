import cors from "cors";
import express, { Router } from "express";
import helmet from "helmet";

import { PORT } from "./config";

class App {
    readonly app: express.Application;
    
    constructor() {
        this.app = express();
    }

    public startServer(port: number | null): void {
        const actualPort = PORT ?? port;

        this.app.listen(actualPort, () => console.log(`Listing port ${actualPort}`));
    }

    public addRouter(router: Router): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(router);
    }
}

export default App;
