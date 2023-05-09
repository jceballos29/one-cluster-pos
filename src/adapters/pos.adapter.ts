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
		id: String(category.id),
		name: category.name,
		products: category.products.length,
	}));
};

export const productsAdapter = (
	response: ProductResponse[],
): Product[] => {
	return response.map((product) => ({
		id: product.id,
		name: product.name,
		image: product.image_url,
		price: product.list_price,
		quantity: product.quantity,
		category: String(product.categories_all[0]),
	}));
};

export const clientsAdapter = (
	response: ClientResponse[],
): Client[] => {
	return response.map((client) => ({
		id: client.id,
		name: client.name,
		type: client.type,
	}));
};

export const terminalsAdapter = (response: TerminalResponse[]) => {
	return response.map((terminal) => ({
		id: String(terminal.id),
		code: terminal.code,
		base: terminal.base,
		isBusy: terminal.isBusy,
	}));
}

export const terminalAdapter = (response: TerminalResponse) => {
	return {
		id: String(response.id),
		code: response.code,
		base: response.base,
		isBusy: response.isBusy,
	};
}