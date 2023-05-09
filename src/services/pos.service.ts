import axios from "axios";
import { loadAbort } from '../utilities/load-abort-axios.utility';
import { DatabasesResponse } from "../types.d";

export const fetchDatabases = () => {
	const controller = loadAbort();
	return {
		call: axios.get<DatabasesResponse>('https://api2.onecluster.org/api/warehouses', {
			signal: controller.signal,
		}),
		controller,
	}
};