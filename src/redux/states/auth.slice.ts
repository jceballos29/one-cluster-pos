/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { User, UserEmpty } from '../../types.d';

export interface AuthState {
	isAuthenticated: boolean;
	user: User;
	session: string;
	database: string;
	token: string;
}

export const initialState: AuthState = {
	isAuthenticated: false,
	user: UserEmpty,
	session: '',
	database: '',
	token: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => action.payload,
		logout: () => initialState,
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
