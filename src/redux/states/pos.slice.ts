/** @format */

import { createSlice } from '@reduxjs/toolkit';
import {
	Database,
	Category,
	Product,
	Client,
	Terminal,
} from '@/types';

export interface PosState {
	warehouse: Database | null;
	categories: Category[];
	products: Product[];
	clients: Client[];
	terminals:Terminal[];
	terminal: Terminal | null;
	filteredProducts: Product[];
	selectedCategory: string | null;
	filter: string;
	selectedClient: Client | null;
}

const initialState: PosState = {
	warehouse: null,
	categories: [],
	products: [],
	clients: [],
	terminals: [],
	terminal: null,
	filteredProducts: [],
	selectedCategory: null,
	filter: '',
	selectedClient: null,
};

const databaseSlice = createSlice({
	name: 'pos',
	initialState,
	reducers: {
		setPOS: (state, action) => {
			return {
				...state,
				warehouse: action.payload.warehouse,
				categories: action.payload.categories,
				products: action.payload.products,
				clients: action.payload.clients,
				terminal: null,
				filteredProducts: action.payload.products,
			};
		},

		setTerminals: (state, action) => {
			return {
				...state,
				terminals: action.payload,
			};
		},

		setTerminal: (state, action) => {
			return {
				...state,
				terminal: action.payload,
			};
		},

		selectCategory: (state, action) => {
			return {
				...state,
				selectedCategory: action.payload,
			};
		},
		filterProducts: (state, action) => {
			return {
				...state,
				filteredProducts: action.payload,
			};
		},

		setFilter: (state, action) => {
			return {
				...state,
				filter: action.payload,
			};
		},

		setSelectedClient: (state, action) => {
			return {
				...state,
				selectedClient: action.payload,
			};
		},

		resetPOS: (state, action) => initialState,
	},
});

export const {
	setPOS,
	setTerminal,
	selectCategory,
	resetPOS,
	filterProducts,
	setFilter,
	setTerminals,
	setSelectedClient,
} = databaseSlice.actions;

export default databaseSlice.reducer;
