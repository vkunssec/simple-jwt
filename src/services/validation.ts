import { StatusCodes } from "http-status-codes";

import { ACCESS_TOKEN_TTL } from "../config";
import { sign, verify } from "../core/utils/jwt";

export class ValidationService {
	readonly create = (key: string) => {
		const token = sign(
			{ key },
			{ expiresIn: ACCESS_TOKEN_TTL },
		);

		return {
			status: StatusCodes.OK,
			response: {
				token: token,
			},
		};
	};
	readonly verify = (token: string) => {
		const decoded = verify(token);

		if (!decoded.valid) {
			return {
				status: StatusCodes.FORBIDDEN,
				response: decoded,
			};
		}

		return {
			status: StatusCodes.OK,
			response: decoded,
		};
	};
}
