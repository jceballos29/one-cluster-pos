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
import { Categories, Navbar } from './components';
import { AppStore } from '@/redux/store';

export interface PointOfSaleProps {}

const PointOfSale: React.FC<PointOfSaleProps> = () => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const { filteredProducts } = useSelector((store: AppStore) => store.pos)

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
			<div className='h-full w-full flex overflow-hidden p-6 pt-[96px] pr-[512px] gap-6'>
				<div className='w-3/4 h-full flex'>
					<Categories />
					<div className='w-4/5 h-full bg-blue-50 flex flex-col overflow-hidden'>
						<h3 className='font-semibold text-2xl mb-2 text-slate-900'>Productos</h3>
						<div className='w-full h-full flex-grow'>
							{
								filteredProducts.map((product) => (
									<div key={product.id}>{product.name}</div>
								))
							}
						</div>
					</div>
				</div>
				<div className='w-1/4 h-full bg-red-100'></div>
			</div>
			<div className='absolute top-0 right-0 h-full w-[512px] p-6 z-20'>
				<div className='w-full h-full border border-blue-100 bg-blue-100 shadow-md rounded-xl'></div>
			</div>
			{/* <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div> */}
		</div>
	);
};

export default PointOfSale;
