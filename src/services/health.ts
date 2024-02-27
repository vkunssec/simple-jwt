export class HeathService {
    readonly index = async (): Promise<any> => {
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
