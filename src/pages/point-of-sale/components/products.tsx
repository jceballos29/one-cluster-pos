/** @format */

import React from 'react';

import ProductTile from './product-tile';
import { useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';

const Products: React.FC = () => {
	const { filteredProducts } = useSelector(
		(store: AppStore) => store.pos,
	);

	return (
		<div className='w-4/5 h-full overflow-hidden'>
			<h3 className='font-semibold text-3xl mb-2'>Productos</h3>
			<div className='w-full flex flex-wrap items-start gap-6 pt-6 pb-12 overflow-y-scroll flex-none order-1 flex-grow max-h-full  scrollbar-hide'>
				{filteredProducts.map((product) => (
					<ProductTile key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Products;
