import { TerminalResponse } from './../types.d';
/** @format */

import { Product } from './../types.d';
/** @format */

import {
	CategoriesResponse,
	Category,
	Database,
	DatabaseResponse,
	DatabasesResponse,
	ProductResponse,
	Client,
	ClientResponse,
} from '../types';

export const databasesAdapter = (
	response: DatabasesResponse,
): Database[] => {
	return response.map((database) => ({
		id: database._id,
		name: database.name,
	}));
};

export const databaseAdapter = (
	response: DatabaseResponse,
): Database => {
	return {
		id: response._id,
		name: response.name,
		allowedUsers: response.allowedUsers,
		terminals: response.terminals,
	};
};

export const categoriesAdapter = (
	response: CategoriesResponse,
): Category[] => {
	return response.map((category) => ({
		id: category._id,
		name: category.name,
		products: category.products.length,
	}));
};

export const productsAdapter = (
	response: ProductResponse[],
): Product[] => {
	return response.map((product) => ({
		id: product._id,
		name: product.name,
		image: product.image,
		price: {
			retail: product.price.retail,
			wholesale: product.price.wholesale,
		},
		quantity: product.quantity,
		category: product.category,
	}));
};

export const clientsAdapter = (
	response: ClientResponse[],
): Client[] => {
	return response.map((client) => ({
		id: client._id,
		name: client.name,
		type: client.type,
	}));
};

export const terminalsAdapter = (response: TerminalResponse[]) => {
	return response.map((terminal) => ({
		id: terminal._id,
		code: terminal.code,
		base: terminal.base,
		isBusy: terminal.isBusy,
	}));
}

export const terminalAdapter = (response: TerminalResponse) => {
	return {
		id: response._id,
		code: response.code,
		base: response.base,
		isBusy: response.isBusy,
	};
}