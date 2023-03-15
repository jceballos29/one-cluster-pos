/** @format */

import { createSlice } from '@reduxjs/toolkit';

export type DiscountOption = 'Valor' | 'Porcentaje' | null;

export interface DisplayState {
	value: string,
	type: 'Cant' | 'Desct',
	discountOption: DiscountOption,
}

export const initialState: DisplayState = {
	value: '',
	type: 'Cant',
	discountOption: null,
};

const displaySlice = createSlice({
	name: 'display',
	initialState,
	reducers: {
		setDisplay: (state, action) => {
			return {
				...state,
				value: action.payload,
			}
		},
		setType: (state, action) => {
			return {
				...state,
				type: action.payload,
			}
		},
		setDiscountOption: (state, action) => {
			return {
				...state,
				discountOption: action.payload,
			}
		},
		resetDisplay: () => initialState,
	},
});

export const {
	setDisplay,
	setType,
	setDiscountOption,
	resetDisplay
} = displaySlice.actions;

export default displaySlice.reducer;
