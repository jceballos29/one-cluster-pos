/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { User, UserEmpty } from '../../types.d';

export interface AuthState {
	isAuthenticated: boolean;
	user: User;
}

export const initialState: AuthState = {
	isAuthenticated: false,
	user: UserEmpty,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => ({
			...state,
			isAuthenticated: true,
			user: action.payload,
		}),
		logout: () => initialState,
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
