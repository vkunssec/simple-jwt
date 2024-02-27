import jsonwebtoken from "jsonwebtoken";

import { ACCESS_TOKEN_PRIVATE_KEY, ACCESS_TOKEN_PUBLIC_KEY } from "../../config";

export const sign = (object: { key: string }, options?: jsonwebtoken.SignOptions): string => {
	const signingKey = Buffer.from(ACCESS_TOKEN_PRIVATE_KEY, "base64").toString("ascii");

	return jsonwebtoken.sign(object, signingKey, {
		...(options && options),
		algorithm: "RS256",
	});
};

export const verify = (token: string) => {
	const publicKey = Buffer.from(ACCESS_TOKEN_PUBLIC_KEY, "base64").toString("ascii");

	try {
		const decoded = jsonwebtoken.verify(token, publicKey);
		return {
			valid: true,
			expired: false,
			decoded,
		};
	} catch (e: unknown) {
		const error = e as jsonwebtoken.JwtPayload;
		return {
			valid: false,
			expired: error.message === "jwt expired",
			decoded: null,
		};
	}
};
