import { expect, describe, test } from "vitest";
import request from "supertest";

import App from "../../app";
import healthRoutes from "../../routers/health.routes";

describe("[health.routes.ts]", () => {
	test("Deve checar a saúde do serviço", async () => {
		const server = new App();

		server.addRouter(healthRoutes);

		server.startServer(0);

		const response = await request(server.app).get("/");

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("uptime");
		expect(response.body).toHaveProperty("message");
		expect(response.body).toHaveProperty("timestamp");
		expect(response.body.message).toBe("OK");
	});
});
