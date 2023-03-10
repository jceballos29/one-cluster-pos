/** @format */

import {
	categoriesAdapter,
	clientsAdapter,
	databaseAdapter,
	productsAdapter,
} from '@/adapters/pos.adapter';
import { Loader } from '@/components';
import { setPOS } from '@/redux/states/pos.slice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Categories, Navbar, Products } from './components';
import { AppStore } from '@/redux/store';

export interface PointOfSaleProps {}

const PointOfSale: React.FC<PointOfSaleProps> = () => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.all([
				axios.get('/api/categories'),
				axios.get('/api/products'),
				axios.get('/api/warehouses/detail'),
				axios.get('/api/clients'),
			])
			.then(
				axios.spread((categories, products, warehouses, clients) => {
					dispatch(
						setPOS({
							categories: categoriesAdapter(categories.data),
							products: productsAdapter(products.data),
							warehouse: databaseAdapter(warehouses.data),
							clients: clientsAdapter(clients.data),
							filteredProducts: productsAdapter(products.data),
						}),
					);
					setLoading(false);
				}),
			);
	}, []);

	return loading ? (
		<Loader />
	) : (
		<div className='w-full h-full flex overflow-hidden relative bg-blue-50 dark:bg-slate-900 transition-colors'>
			<Navbar />
			<div className='h-full w-full flex overflow-hidden p-6 pt-[96px] pr-[448px] gap-6'>
				<div className='w-3/4 h-full flex '>
					<Categories />
					<Products />
				</div>
				<div className='w-1/4 h-full'></div>
			</div>
			<div className='absolute top-0 right-0 h-full w-[448px] p-6 z-20'>
				<div className='w-full h-full bg-slate-300 shadow-md rounded-xl'></div>
			</div>
		</div>
	);
};

export default PointOfSale;
