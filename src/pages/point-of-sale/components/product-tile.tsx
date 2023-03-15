/** @format */

import React from 'react';
import type { Product } from '@/types';
import { formatCurrency } from '@/utilities';

type Props = {
	product: Product;
};

const ProductTile: React.FC<Props> = ({ product }) => {
	return (
		<div
			className='flex flex-col justify-end items-center p-0 w-48 flex-none order-none flex-grow-0'
			style={{
				height: '294px',
				borderRadius: '12px',
			}}
		>
			<div
				className='relative flex flex-col items-center w-48 h-64 bg-white flex-none order-none flex-grow-0 shadow'
				style={{
					padding: '112px 12px 24px',
					gap: '8px',
					isolation: 'isolate',
					borderRadius: '12px',
				}}
			>
				<img
					className='absolute w-32 h-32 bg-gray-300 flex-none order-none flex-grow-0 z-0'
					style={{
						top: '-43px',
						borderRadius: '64px',
					}}
					src=''
					alt={product.name}
				/>
				<h4
					className='w-47 mt-[-20px] not-italic font-semibold text-lg leading-7
                        text-center text-blue-700 z-1'
				>
					{product.name}
				</h4>
				<h4
					className='absolute w-48 mt-[40%] not-italic font-normal text-base leading-6
                        text-center text-blue-600'
				>
					{formatCurrency(product.price.wholesale)}
				</h4>
				<h5
					className='absolute w-48 mt-[55%] h-4 not-italic font-light text-xs leading-4
                        text-center text-blue-400'
				>
					{product.quantity} productos
				</h5>
			</div>
		</div>
	);
};

export default ProductTile;
