import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import headers from "../core/helpers/headers";
import { ValidationService } from "../services/validation";

export class ValidationController {
	private readonly service: ValidationService = new ValidationService();

	readonly createSession = async (req: Request, res: Response): Promise<Response> => {
		const { key = "" } = req.body;
		if (key == "" || !key) {
			return res.status(StatusCodes.BAD_REQUEST).header(headers).json({ error: "bad request" });
		}

		const { status, response } = this.service.create(key);

		return res.status(status).header(headers).json(response);
	};

	readonly verifySession = async (req: Request, res: Response): Promise<Response> => {
		const { token = "" } = req.body;
		if (token == "" || !token) {
			return res.status(StatusCodes.BAD_REQUEST).header(headers).json({ error: "bad request" });
		}

		const { status, response } = this.service.verify(token);

		return res.status(status).header(headers).json(response);
	};
}
