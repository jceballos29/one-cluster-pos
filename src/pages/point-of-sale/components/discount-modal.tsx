/** @format */

import { setTerminal } from '@/redux/states/pos.slice';
import { AppStore } from '@/redux/store';
import { Terminal } from '@/types';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/solid';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface DiscountModalProps {
	show: boolean;
	handleShow: (state: boolean) => void;
}

const DiscountModal: React.FC<DiscountModalProps> = ({
	show,
	handleShow,
}) => {
	const { terminal } = useSelector((store: AppStore) => store.pos);
	const discountOptions = [{
		_id: 1,
		type: 'valor',
	},
	{
		_id: 2,
		type: 'porcentaje'
	}]

	const [selectedDiscountOption, setSelectedDiscountOption] = useState('');

	const handleSelect = (discountOption: string) => {
		setSelectedDiscountOption(discountOption);
		handleShow(false);
	};

	return (
		<Transition appear show={show} as={Fragment}>
			<Dialog
				as='div'
				// onClose={() => (selectedDiscountOption ? handleShow(false) : null)}
				onClose={() => (handleShow(false))}
				className='relative z-30'
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-blue-50 dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-slate-900 dark:text-slate-50'
								>
									Selecciona el tipo de descuento
								</Dialog.Title>
								<div className='mt-4'>
									<RadioGroup
										value={selectedDiscountOption}
										onChange={handleSelect}
									>
										<RadioGroup.Label className='sr-only'>
											Discount Options
										</RadioGroup.Label>
										<div className='space-y-2'>
											{discountOptions.map((discountOption) => (
												<RadioGroup.Option
													key={discountOption._id}
													value={discountOption.type}
													className={({ active, checked }) =>
														`${active
															? 'ring-2 ring-offset-2 ring-offset-blue-300 ring-white ring-opacity-60 dark:ring-slate-500 dark:ring-offset-slate-300'
															: ''
														}
                                						${checked
															? 'bg-blue-600 bg-opacity-75 text-white dark:bg-slate-600 dark:text-slate-50'
															: 'bg-white text-slate-900 hover:bg-blue-100 dark:bg-slate-500 dark:text-slate-50 dark:hover:bg-slate-400 transition-colors'
														}
                                						relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none `
													}
												>
													{({ active, checked }) => (
														<>
															<div className='flex items-center justify-between w-full'>
																<div className='flex items-center'>
																	<div className='text-sm'>
																		<RadioGroup.Label
																			as='p'
																			className={`font-bold ${checked
																				? 'text-white'
																				: 'text-slate-900 dark:text-slate-50'
																				}`}
																		>
																			En {discountOption.type}
																		</RadioGroup.Label>
																	</div>
																</div>
																{checked && (
																	<div className='flex-shrink-0 text-white dark:text-slate-50'>
																		<CheckIcon
																			className='h-6 w-6'
																			aria-hidden='true'
																		/>
																	</div>
																)}
															</div>
														</>
													)}
												</RadioGroup.Option>
											))}
										</div>
									</RadioGroup>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default DiscountModal;
