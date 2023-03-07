/** @format */

import { AppStore } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import Category from './category';

const Categories: React.FC = () => {
	const { categories } = useSelector((store: AppStore) => store.pos);

	return (
		<div className='w-1/5 h-full flex flex-col overflow-hidden  p-4 mr-4 bg-slate-300 rounded-xl shadow-md'>
			<h3 className='font-semibold text-2xl mb-6 text-slate-900'>
				Categorías
			</h3>
			<div className='h-full h-max-full flex-grow w-full space-y-2 overflow-y-scroll scrollbar-hide'>
				{categories.map((category) => (
					<Category key={category.id} element={category} />
				))}
			</div>
		</div>
	);
};

export default Categories;
