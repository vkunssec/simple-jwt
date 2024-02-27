import { expect, describe, test } from "vitest";
import request from "supertest";

import App from "../../app";
import validationRoutes from "../../routers/validation.routes";

describe("[validation.routes.ts]", () => {
	describe("Criação do Token JWT", () => {
		test("Deve criar Token JWT", async () => {
			const server = new App();

			server.addRouter(validationRoutes);

			server.startServer(0);

			const payload = {
				key: "123",
			};

			const response = await request(server.app)
				.post("/validation/create")
				.send(payload)
				.set("Content-Type", "application/json")
				.set("Accept", "application/json");

			expect(response.status).toBe(200);
			expect(response.body).haveOwnProperty("token");
		});

		test("Deve retornar erro 400 caso não seja enviado um valor no body para validação", async () => {
			const server = new App();

			server.addRouter(validationRoutes);

			server.startServer(0);

			const payload = {
				key: undefined,
			};

			const response = await request(server.app)
				.post("/validation/create")
				.send(payload)
				.set("Content-Type", "application/json")
				.set("Accept", "application/json");

			expect(response.status).toBe(400);
			expect(response.body).haveOwnProperty("error");
			expect(response.body.error).toBe("bad request");
		});
	});

	describe("Verificação do Token JWT", () => {
		test("Deve verificar o Token JWT e retornar que está válido", async () => {
			const server = new App();

			server.addRouter(validationRoutes);

			server.startServer(0);

			const payload = {
				key: "123",
			};

			const created = await request(server.app)
				.post("/validation/create")
				.send(payload)
				.set("Content-Type", "application/json")
				.set("Accept", "application/json");

			const token = created.body.token;

			const response = await request(server.app)
				.post("/validation/verify")
				.send({ token })
				.set("Content-Type", "application/json")
				.set("Accept", "application/json");

			expect(response.status).toBe(200);
			expect(response.body).haveOwnProperty("valid");
			expect(response.body).haveOwnProperty("expired");
			expect(response.body).haveOwnProperty("decoded");
			expect(response.body.valid).toEqual(true);
			expect(response.body.expired).toEqual(false);
		});

		test("Deve retornar erro 403 caso o Token JWT não está mais válido", async () => {
			const server = new App();

			server.addRouter(validationRoutes);

			server.startServer(0);

			const token = "invalid_token";

			const response = await request(server.app)
				.post("/validation/verify")
				.send({ token })
				.set("Content-Type", "application/json")
				.set("Accept", "application/json");

			expect(response.status).toBe(403);
			expect(response.body).haveOwnProperty("valid");
			expect(response.body).haveOwnProperty("expired");
			expect(response.body).haveOwnProperty("decoded");
			expect(response.body.valid).toEqual(false);
		});

		test("Deve retornar erro 400 caso não seja enviado o Token para validação", async () => {
			const server = new App();

			server.addRouter(validationRoutes);

			server.startServer(0);

			const token = undefined;

			const response = await request(server.app)
				.post("/validation/verify")
				.send({ token })
				.set("Content-Type", "application/json")
				.set("Accept", "application/json");

			expect(response.status).toBe(400);
			expect(response.body).haveOwnProperty("error");
			expect(response.body.error).toBe("bad request");
		});
	});
});
