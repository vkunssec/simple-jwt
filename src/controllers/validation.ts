import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import headers from "../core/helpers/headers";

export class ValidationController {
	readonly privateRouter = async (req: Request, res: Response): Promise<Response> => {
		
        return res.status(StatusCodes.OK).header(headers).json({});
	}
}
