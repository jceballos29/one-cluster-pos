/** @format */

import { products } from './data';
/** @format */
import { AxiosResponse } from 'axios';

export interface AxiosCall<T> {
	call: Promise<AxiosResponse<T>>;
	controller: AbortController;
}

export type Database = {
	id: string;
	name: string;
	allowedUsers?: string[];
	terminals?: {
		_id: string;
		code: string;
		base: number;
	}[];
};

export type DatabasesResponse = {
	_id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}[];

export type DatabaseResponse = {
	_id: string;
	name: string;
	allowedUsers: string[];
	terminals: {
		_id: string;
		code: string;
		base: number;
	}[];
	createdAt: string;
	updatedAt: string;
};

export type TerminalResponse = {
	id: number;
	code: string;
	base: number;
	isBusy: string | null;
	warehouse: string;
	createdAt: string;
	updatedAt: string;
}

export type Terminal = {
	id: string;
	code: string;
	base: number;
	isBusy: string | null;
}

export type Category = {
	id: string;
	name: string;
	products: number;
};

export type CategoriesResponse = {
	id: number;
	name: string;
	products: string[];
	warehouse: string;
	createdAt: string;
	updatedAt: string;
}[];

export type Product = {
	id: string;
	name: string;
	image: string;
	price: number;
	quantity: number
	category: string;
}

export type ProductResponse = {
	id: string;
	name: string;
	image_url: string;
	list_price: number;
	quantity: number
	warehouse: string;
	categories_all: number[];
	createdAt: string;
	updatedAt: string;
}

export type Client = {
	id: string;
	name: string;
	type: 'retail' | 'wholesale';
}

export type ClientResponse = {
	id: string;
	name: string;
	type: 'retail' | 'wholesale';
	createdAt: string;
	updatedAt: string;
}

export type User = {
	avatar: string;
	id: string;
	name: string;
	username: string;
	role: string;
};

export type UserResponse = {
	_id: string;
	name: string;
	username: string;
	role: string;
	avatar: string;
	createdAt: string;
	updatedAt: string;
};

export const UserEmpty: User = {
	id: '',
	name: '',
	username: '',
	role: '',
};

export type LoginResponse = {
	user: UserResponse;
	token: string;
};

export type LoginRequest = {
	username: string;
	password: string;
	database: string;
};
