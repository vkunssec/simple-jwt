export class HeathService {
	readonly index = async (): Promise<{
		uptime: number;
		message: string;
		timestamp: Date;
	}> => {
		return new Promise((resolve) => {
			const result = {
				uptime: process.uptime(),
				message: "OK",
				timestamp: new Date()
			};

			resolve(result);
		});
	};
}
