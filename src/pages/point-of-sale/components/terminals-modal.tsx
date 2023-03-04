/** @format */

import { setTerminal } from '@/redux/states/pos.slice';
import { AppStore } from '@/redux/store';
import { Terminal } from '@/types';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/solid';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface TerminalsModalProps {
	show: boolean;
	handleShow: (state: boolean) => void;
	terminals: Terminal[] | [];
}

const TerminalsModal: React.FC<TerminalsModalProps> = ({
	show,
	handleShow,
	terminals,
}) => {
	const { terminal } = useSelector((store: AppStore) => store.pos);
	const [selectedTerminal, setSelectedTerminal] = useState(
		terminals.find((t) => t._id === terminal?._id) || null,
	);
	const dispatch = useDispatch();

	const handleSelect = (terminal: Terminal) => {
		setSelectedTerminal(terminal);
		dispatch(setTerminal(terminal));
		sessionStorage.setItem('terminal', terminal._id);
		handleShow(false);
	};

	return (
		<Transition appear show={show} as={Fragment}>
			<Dialog
				as='div'
				onClose={() => handleShow(false)}
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
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-gray-900'
								>
									Selecciona una terminal
								</Dialog.Title>
								<div className='mt-4'>
									<RadioGroup
										value={selectedTerminal}
										onChange={handleSelect}
									>
										<RadioGroup.Label className='sr-only'>
											Terminals
										</RadioGroup.Label>
										<div className='space-y-2'>
											{terminals.map((terminal) => (
												<RadioGroup.Option
													key={terminal._id}
													value={terminal}
													className={({ active, checked }) =>
														`${
															active
																? 'ring-2 ring-offset-2 ring-offset-blue-300 ring-white ring-opacity-60'
																: ''
														}
                                ${
																	checked
																		? 'bg-blue-600 bg-opacity-75 text-white'
																		: 'bg-white text-gray-900 hover:bg-blue-100'
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
																			className={`font-bold ${
																				checked
																					? 'text-white'
																					: 'text-gray-900'
																			}`}
																		>
																			Terminal {terminal.code}
																		</RadioGroup.Label>
																		<RadioGroup.Description
																			as='span'
																			className={`inline text-xs ${
																				checked
																					? 'text-blue-200'
																					: 'text-gray-500'
																			}`}
																		>
																			<strong>Base:</strong> ${' '}
																			{terminal.base}
																		</RadioGroup.Description>
																	</div>
																</div>
																{checked && (
																	<div className='flex-shrink-0 text-white'>
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

export default TerminalsModal;
