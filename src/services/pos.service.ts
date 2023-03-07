import axios from "axios";
import { loadAbort } from '../utilities/load-abort-axios.utility';
import { DatabasesResponse } from "../types.d";

export const fetchDatabases = () => {
	const controller = loadAbort();
	return {
		call: axios.get<DatabasesResponse>('/api/warehouses', {
			signal: controller.signal,
		}),
		controller,
	}
};