import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import headers from "../core/helpers/headers";
import { HeathService } from "../services/health";

export class HealthController {
	private readonly service: HeathService = new HeathService();

	readonly index = async (req: Request, res: Response): Promise<Response> => {
		const response = await this.service.index();

		return res.status(StatusCodes.OK).header(headers).json(response);
	};
}
