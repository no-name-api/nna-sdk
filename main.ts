import config from "./config";
import { ConnectOptions, NewLogPayload } from "./types/main.types";
/**
 * @class NNA
 * @description Main class for the NNA SDK. Spawns Logger instance.
 * @param {string} apiKey - user api key.
 * @param {ConnectOptions} options - options for the SDK.
 */
class NNA {
	private apiKey: string;
	options = {
		isDev: false,
	};
	constructor(apiKey: string, options?: ConnectOptions) {
		this.apiKey = apiKey;
		if (options) {
			this.options = options;
		}
	}

	/**
	 * @name captureException
	 * @param {Error} error - error Instance or unknown
	 * @param {string} level - place of the error
	 * @returns
	 */
	public async captureException(error: Error | unknown, level: string) {
		let message = "";
		if (error instanceof Error) {
			message = "Error: " + error.message;
		} else {
			message = "An unknown error occurred while logging.";
		}

		try {
			const response = await fetch(`${config.server_url}/exception`, {
				method: "POST",
				body: JSON.stringify({
					apiKey: this.apiKey,
					message,
					level,
				}),
			});

			if (response.ok) {
				return response.json();
			}
			throw new Error(`Failed to log. Status: ${response.status}`);
		} catch (error: unknown) {
			if (error instanceof Error) {
				return error.message;
			} else {
				return "An unknown error occurred while catching exception.";
			}
		}
	}

	/**
	 * @name send
	 * @param {NewLogPayload} payload - payload object for the log consists of message and level
	 * @param {string} payload.message - message to be logged
	 * @param {string} payload.level - level of the log
	 * @returns
	 */
	public async send({ message, level }: NewLogPayload) {
		try {
			const response = await fetch(`${config.server_url}/log`, {
				method: "POST",
				body: JSON.stringify({
					apiKey: this.apiKey,
					message,
					level,
				}),
			});

			if (response.ok) {
				return response.json();
			}
			throw new Error(`Failed to log. Status: ${response.status}`);
		} catch (error: unknown) {
			if (error instanceof Error) {
				return error.message;
			} else {
				return "An unknown error occurred while logging.";
			}
		}
	}

	public async getLogs() {
		try {
			const response = await fetch(
				`${config.server_url}/logs/e1d923e2-a0b0-4cff-bd0c-c23227d5e9af`,
				{
					method: "GET",
				}
			);

			if (response.ok) {
				return response.json();
			}

			throw new Error(`Failed to get logs. Status: ${response.status}`);
		} catch (error) {
			if (error instanceof Error) {
				return error.message;
			} else {
				return "An unknown error occurred while getting logs.";
			}
		}
	}
}
/**
 * @class NNA
 * @description Main class for the NNA SDK. Spawns Logger instance.
 * @param {string} apiKey - user api key.
 * @param {ConnectOptions} options - options for the SDK.
 */
export const NNApi = (apiKey: string, options?: ConnectOptions) =>
	new NNA(apiKey, options);
