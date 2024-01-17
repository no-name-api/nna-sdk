import axios from "axios";
import config from "./config";
import { ConnectOptions, NewLogPayload } from "./types/main.types";

const baseQuery = axios.create({
	baseURL: config.server_url,
	adapter: "http",
});

/**
 * @class NNA
 * @description Main class for the NNA SDK. Spawns Logger instance.
 * @param {string} api_key - user api key.
 * @param {string} logger_name - name of the logger.
 * @param {ConnectOptions} options - options for the SDK.
 */
class NNA {
	private api_key: string;
	public logger_name: string;
	options = {
		isDev: false,
	};
	constructor(api_key: string, logger_name: string, options?: ConnectOptions) {
		this.api_key = api_key;
		this.logger_name = logger_name;
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
			const body = {
				api_key: this.api_key,
				logger_name: this.logger_name,
				message,
				level,
			};
			const { data, status } = await baseQuery.post(
				config.server_url + "/exception",
				body
			);

			if (data) {
				return data;
			}

			throw new Error(`Failed to log. Status: ${status}`);
		} catch (error: unknown) {
			if (error instanceof Error) {
				return error?.message;
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
			const body = {
				api_key: this.api_key,
				logger_name: this.logger_name,
				message,
				level,
			};
			const { data, status } = await baseQuery.post(
				config.server_url + "/log",
				body
			);

			if (data) {
				return data;
			}
			throw new Error(`Failed to log. Status: ${status}`);
		} catch (error: unknown) {
			if (error instanceof Error) {
				return error?.message;
			} else {
				return "An unknown error occurred while logging.";
			}
		}
	}
}
/**
 * @class NNA
 * @description Main class for the NNA SDK. Spawns Logger instance.
 * @param {string} api_key - user api key.
 * @param {string} logger_name - name of the logger.
 * @param {ConnectOptions} options - options for the SDK.
 */
const NNApi = (
	api_key: string,
	logger_name: string,
	options?: ConnectOptions
) => new NNA(api_key, logger_name, options);

export default NNApi;

const nna = NNApi("725aa510-c8c6-4a50-9734-f602bc38c34e", "nna");
