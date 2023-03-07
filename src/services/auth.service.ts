/** @format */

import axios from 'axios';
import { loadAbort } from '@/utilities/load-abort-axios.utility';
import { LoginRequest, LoginResponse } from '@/types.d';

export const login = (data: LoginRequest) => {
	const controller = loadAbort();
	return {
		call: axios.post<LoginResponse>('/api/auth/login', data, {
			signal: controller.signal,
		}),
		controller,
	};
};

export const session = () => {
	const controller = loadAbort();
	return {
		call: axios.get('/api/auth/session', {
			signal: controller.signal,
		}),
		controller,
	};
};

export const logout = () => {
	const controller = loadAbort();
	return {
		call: axios.post('/api/auth/logout', {
			signal: controller.signal,
		}),
		controller,
	};
};

export const setAccessToken = (token: string) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	localStorage.setItem('token', token);
};
