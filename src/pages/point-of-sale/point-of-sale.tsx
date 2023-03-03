/** @format */

import { categories, products } from '../../data';
import { Navbar } from './components';

function PointOfSale() {
	return (
		<div className='w-full h-full flex overflow-hidden relative'>
			<Navbar />
			<div className='h-full w-full flex overflow-hidden p-6 pt-[96px] pr-[512px] gap-6'>
				<div className='w-3/4 h-full flex gap-6'>
					<div className='w-1/4 h-full'>
						<div className='w-full h-full flex flex-col'>
							<h3 className='font-semibold text-xl mb-6'>
								Categorías
							</h3>
							<div className='h-full flex-grow  w-full'>
								{categories.map((category) => (
									<div
										key={category.id}
										className='w-full h-12 bg-white shadow rounded-lg mb-2 last:mb-0 px-6 flex items-center justify-between'
									>
										<h4 className='font-medium capitalize text-gray-900'>
											{category.name}
										</h4>
										<span className='flex px-1.5 py-1 bg-gray-200 rounded item-center justify-center text-sm leading-[14px] text-gray-500'>
											{
												products.filter(
													(product) =>
														product.category === category.id,
												).length
											}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='w-3/4 h-full bg-blue-50 overflow-hidden'>
						<h3 className='font-semibold text-xl mb-2'>Productos</h3>
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
}

export default PointOfSale;
