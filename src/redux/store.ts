/** @format */

import { configureStore } from '@reduxjs/toolkit';

import authReducer, { AuthState } from './states/auth.slice';
import posReducer, { PosState } from './states/pos.slice'

export interface AppStore {
	auth: AuthState;
	pos: PosState;
}

const store = configureStore({
	reducer: {
		auth: authReducer,
		pos: posReducer,
	},
});

export default store;
