/** @format */

import React from 'react';

const Navbar = () => {
	return (
		<nav className='w-full fixed z-10 flex items-start justify-between p-6 pr-[512px]'>
			<div>
				<h2 className='text-3xl leading-none text-gray-900 font-bold'>
					Database
				</h2>
				<p className='text-lg leading-none text-gray-500'>
					Termina 1
				</p>
			</div>
			<div className='w-full max-w-lg h-10 bg-white shadow rounded-xl'></div>
			<div className='flex gap-3'>
				<div className='w-10 h-10 bg-white shadow rounded-xl'></div>
				<div className='w-10 h-10 bg-white shadow rounded-xl'></div>
				<div className='w-10 h-10 bg-white shadow rounded-xl'></div>
				<div className='w-10 h-10 bg-white shadow rounded-xl'></div>
			</div>
		</nav>
	);
};

export default Navbar;
