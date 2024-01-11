import Logger from "./services/Logger";
import { ConnectResponse } from "./types/logger.types";
/**
 * @class NNA
 * @description Main class for the NNA SDK. Spawns Logger instance.
 * @param {string} apiKey - user api key.
 */

class NNA {
	apiKey: string;
	logger: InstanceType<typeof Logger>;
	constructor(apiKey: string) {
		this.apiKey = apiKey;
		this.logger = new Logger();
	}
	/**
	 * @description connects to the server and validates the API key.
	 * @returns error if not connected.
	 */
	connect(): ConnectResponse {
		return this.logger.connect(this.apiKey);
	}
}

export const NNApi = (apiKey: string) => new NNA(apiKey);

const test = NNApi("c7dda661-4b7b-4137-9bd1-1ad1bfd7e639s");
console.log(test);
test.connect().then((res) => {
	console.log(res);
});
