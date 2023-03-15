/** @format */

import { configureStore } from '@reduxjs/toolkit';

import authReducer, { AuthState } from './states/auth.slice';
import displayReducer, { DisplayState } from './states/display.slice';
import posReducer, { PosState } from './states/pos.slice'

export interface AppStore {
	auth: AuthState;
	pos: PosState;
	display: DisplayState
}

const store = configureStore({
	reducer: {
		auth: authReducer,
		pos: posReducer,
		display: displayReducer
	},
});

export default store;
