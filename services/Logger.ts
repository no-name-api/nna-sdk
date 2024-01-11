import config from "../config";
import { ConnectResponse } from "../types/logger.types";
/**
 * @class Logger
 * @description Logger class for logging events.
 */
class Logger {
	async connect(apiKey: string): ConnectResponse {
		const response = await fetch(`${config.server_url}/connect`, {
			method: "POST",
			body: JSON.stringify({ apiKey }),
		});
		console.log(response);
		if (response.ok) {
			const data = (await response.json()) as ConnectResponse;
			return data;
		}
	}
}

export default Logger;
