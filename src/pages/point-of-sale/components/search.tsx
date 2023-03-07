/** @format */

import {
	filterProducts,
	selectCategory,
} from '@/redux/states/pos.slice';
import { AppStore } from '@/redux/store';
import { Product } from '@/types';
import { formatCurrency } from '@/utilities/cop-format';
import { Combobox, Transition } from '@headlessui/react';
import {
	MagnifyingGlassIcon,
	XMarkIcon,
} from '@heroicons/react/20/solid';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Search: React.FC = () => {
	const [selected, setSelected] = useState('');
	const [query, setQuery] = useState('');

	const { products, filter } = useSelector(
		(store: AppStore) => store.pos,
	);
	const dispatch = useDispatch();

	let filteredProducts =
		query === ''
			? []
			: products.filter((product) =>
					product.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, '')),
			  );

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (filteredProducts.length > 0) {
			dispatch(filterProducts(filteredProducts as Product[]));
			dispatch(selectCategory(null));
		}
		setQuery('');
	};

	useEffect(() => {
		setQuery(filter);
		setSelected(filter);
	}, [filter]);

	return (
		<form className=' w-full max-w-lg' onSubmit={onSubmit}>
			<div className='relative  w-full max-w-lg'>
				<div className='relative z-[1] w-full h-10 cursor-default overflow-hidden rounded-lg pl-4 pr-11 flex items-center bg-white dark:bg-slate-500 text-left shadow-md focus:outline-none sm:text-sm transition-colors'>
					<MagnifyingGlassIcon className='w-5 h-5 text-slate-900 dark:text-slate-50 mr-2' />
					<input
						className='appearance-none bg-transparent w-full h-full focus:outline-none caret-slate-900 dark:caret-slate-50 placeholder:text-slate-400 placeholder:text-sm text-sm text-slate-900 dark:text-slate-50'
						onChange={(event) => {
							setQuery(event.target.value);
							setSelected(event.target.value);
						}}
						placeholder='Buscar producto...'
						autoComplete='false'
						autoCorrect='false'
						value={selected}
					/>
					{(query !== '' || selected !== '') && (
						<button
							type='button'
							className='absolute right-0 top-0 bottom-0 flex items-center justify-center w-10 h-full text-slate-900 dark:text-slate-50'
							onClick={() => {
								setQuery('');
								setSelected('');
								dispatch(filterProducts(products as Product[]));
								dispatch(selectCategory(null));
							}}
						>
							<XMarkIcon className='w-5 h-5' />
						</button>
					)}
				</div>
				<Transition
					as={Fragment}
					leave='transition ease-in'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
					afterLeave={() => setQuery('')}
					show={query !== ''}
				>
					<div className='absolute mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 dark:bg-slate-500 text-base shadow-lg sm:text-sm'>
						{filteredProducts.length === 0 && query !== '' ? (
							<div className='relative cursor-default select-none py-2 px-4 text-slate-700'>
								No se encontraron resultados
							</div>
						) : (
							filteredProducts.map((product) => (
								<button
									key={product.id}
									className='relative flex items-center justify-between w-full text-left select-none py-2 px-11 text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 capitalize'
									type='button'
									onClick={() => {
										dispatch(filterProducts([product] as Product[]));
										dispatch(selectCategory(null));
										setSelected(product.name);
										setQuery('');
									}}
								>
									{product.name} 
									<span
										className={`text-slate-400 dark:text-slate-400 font-light italic`}
									>
										{formatCurrency(product.price['retail'])}
									</span>
								</button>
							))
						)}
					</div>
				</Transition>
			</div>
		</form>
	);
};

export default Search;
