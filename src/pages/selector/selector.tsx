/** @format */

import React, { useEffect } from 'react';
import SelectorItem from './components/selector-item';
import { Navigate, useNavigate } from 'react-router-dom';

export interface SelectorProps {}

const Selector: React.FC<SelectorProps> = () => {
	
	return (
		<div className='w-full h-full flex flex-col items-center justify-center select-none'>
			<h1 className='w-full max-w-md text-center font-black text-7xl leading-none mb-7'>
				LICORERA SALVADOR
			</h1>
			<div className='w-full max-w-lg p-14 rounded-xl shadow-lg bg-white mb-7'>
				<h2 className='font-bold text-2xl leading-8 mb-14'>
					Selecciona una opción
				</h2>
				<div className='space-y-3.5'>
					<SelectorItem
						path='/admin'
						title='Administración'
						description='Ingresa aquí para modificaciones'
					/>
					<SelectorItem
						path={`/${'point-of-sale'}`}
						title='Puno de venta'
						description='Ingresa aquí para realizar ventas'
					/>
				</div>
			</div>
			<p className='text-gray-400 font-normal text-sm leading-5 '>
				{new Date().getFullYear()} - One Cluster &#169;
			</p>
		</div>
	);
};

export default Selector;
