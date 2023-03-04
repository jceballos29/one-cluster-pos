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
	categories: Category[] | null;
	products: Product[] | null;
	clients: Client[] | null;
	terminal: Terminal | null;
  filteredProducts: Product[] | null;
}

const initialState: PosState = {
	warehouse: null,
	categories: null,
	products: null,
	clients: null,
	terminal: null,
  filteredProducts: null,
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
        filteredProducts: action.payload.products
			};
		},

    setTerminal: (state, action) => {
      return {
        ...state,
        terminal: action.payload
      }
    },

		resetPOS: (state, action) => initialState,
	},
});

export const { setPOS, setTerminal } = databaseSlice.actions;

export default databaseSlice.reducer;
