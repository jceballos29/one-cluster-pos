/** @format */

import {
	filterProducts,
	selectCategory,
	setFilter,
} from '@/redux/states/pos.slice';
import { AppStore } from '@/redux/store';
import { Category as CategoryType } from '@/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface CategoryProps {
	element: CategoryType;
	key: string;
}

const Category: React.FC<CategoryProps> = ({ element }) => {
	const { selectedCategory, products } = useSelector(
		(store: AppStore) => store.pos,
	);
	const dispatch = useDispatch();

	const handleSelectCategory = (category: string) => {
		if (category === selectedCategory) {
			dispatch(selectCategory(null));
			dispatch(filterProducts(products));
		} else {
			dispatch(selectCategory(category));
			dispatch(
				filterProducts(
					products.filter((p) => p.category === category),
				),
			);
			dispatch(setFilter(''));
		}
	};

	return (
		<button
			onClick={() => handleSelectCategory(element.id)}
			className={`w-full ${
				selectedCategory === element.id
					? 'bg-blue-100 dark:bg-slate-600'
					: 'bg-white dark:bg-slate-500 hover:bg-blue-100 dark:hover:bg-slate-400'
			} rounded-lg shadow px-4 py-3 flex items-center justify-between text-left transition-colors `}
		>
			<h4 className='text-slate-900 dark:text-slate-50 text-sm font-medium capitalize'>
				{element.name}
			</h4>
			<span className={`text-slate-500 dark:text-slate-50 text-xs w-4 h-4 font-light ${selectedCategory === element.id ? 'bg-blue-100 dark:bg-slate-600' : 'bg-slate-200 dark:bg-slate-600'} rounded flex items-center justify-center`}>
				{element.products}
			</span>
		</button>
	);
};

export default Category;
