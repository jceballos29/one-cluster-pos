/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface SelectorItemPops {
	path: string;
	title: string;
	description: string;
}

const SelectorItem: React.FC<SelectorItemPops> = ({
	path,
	title,
	description,
}) => {
	const navigate = useNavigate();

	const handlerRedirect = () => {
		localStorage.setItem('defaultView', path);
		navigate(path);
	};

	return (
		<div
			className='w-full max-w-md relative shadow border border-gray-200 rounded-xl overflow-hidden hover:bg-blue-100 cursor-pointer'
			onClick={handlerRedirect}
		>
			<div className='absolute w-28 aspect-square rounded-full bg-blue-900 -translate-x-6 -translate-y-1/2 top-1/2' />
			<div className='p-5 pl-28'>
				<h3 className='text-slate-900 font-medium text-lg'>
					{title}
				</h3>
				<p className='text-regular text-slate-500 text-sm'>
					{description}
				</p>
			</div>
		</div>
	);
};

export default SelectorItem;
