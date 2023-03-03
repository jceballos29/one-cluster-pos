/** @format */

import axios from 'axios';
import { loadAbort } from '../utilities/load-abort-axios.utility';
import { LoginResponse } from '../types.d';

export const login = (data: {
	username: string;
	password: string;
	database: string;
}) => {
	const controller = loadAbort();
	return {
		call: axios.post<LoginResponse>('/api/auth/login', data, {
			signal: controller.signal,
		}),
		controller,
	};
};

export const validateLogin = async () => {
	return await axios.get('/api/auth/me')
}