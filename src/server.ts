import App from "./app";
import { healthRoutes, validationRoutes } from "./routers";

const server = new App();

server.addRouter(healthRoutes);
server.addRouter(validationRoutes);

server.startServer();
