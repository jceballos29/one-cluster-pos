import axios from "axios";
import { DatabasesResponse } from "../types.d";

export const fetchDatabases = async () => {
	try {
		const response = await axios.get<DatabasesResponse>(
			'http://localhost:5000/api/databases',
		);
		return response.data;
	} catch (error) {
		return [];
	}
};