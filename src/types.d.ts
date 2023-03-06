/** @format */
import { AxiosResponse } from 'axios';

export interface AxiosCall<T> {
	call: Promise<AxiosResponse<T>>;
	controller: AbortController;
}

export type Database = {
	id: string;
	name: string;
};

export type DatabasesResponse = Array<{
	_id: string;
	name: string;
}>;

export type User = {
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
	createdAt: string;
	updatedAt: string;
};

export const UserEmpty: User = {
	id: '',
	name: '',
	username: '',
	role: '',
};

export interface LoginResponse {
	user: UserResponse;
	database: string;
	session: string;
	token: string;
};

export type Product = {
	id: number,
	name: string,
	stock: number,
	price: { retail: number, wholesale: number },
	warehouse: number | string,
	category: number,
}
