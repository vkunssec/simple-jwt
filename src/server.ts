import App from "./app";
import morganMiddleware from "./core/middleware/morgan";
import { healthRoutes, validationRoutes } from "./routers";

const server = new App();

server.addRouter(morganMiddleware);
server.addRouter(healthRoutes);
server.addRouter(validationRoutes);

server.startServer();
