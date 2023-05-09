/** @format */

import axios from 'axios';
import { loadAbort } from '@/utilities/load-abort-axios.utility';
import { LoginRequest, LoginResponse, UserResponse } from '@/types.d';

export const login = (data: LoginRequest) => {
	const controller = loadAbort();
	return {
		call: axios.post<LoginResponse>('/auth/login', data, {
			signal: controller.signal,
		}),
		controller,
	};
};

export const session = () => {
	const controller = loadAbort();
	return {
		call: axios.get('/auth/session', {
			signal: controller.signal,
		}),
		controller,
	};
};

export const logout = () => {
	const controller = loadAbort();
	return {
		call: axios.post('/auth/logout', {
			signal: controller.signal,
		}),
		controller,
	};
};

export const setAccessToken = (token: string) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	localStorage.setItem('token', token);
};
