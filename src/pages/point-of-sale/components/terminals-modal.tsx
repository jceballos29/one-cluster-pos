/** @format */

import {
	terminalAdapter,
	terminalsAdapter,
} from '@/adapters/pos.adapter';
import { setTerminal, setTerminals } from '@/redux/states/pos.slice';
import { AppStore } from '@/redux/store';
import { Terminal, TerminalResponse } from '@/types';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import {
	CheckIcon,
	CheckCircleIcon,
} from '@heroicons/react/24/solid';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface TerminalsModalProps {
	show: boolean;
	handleShow: (state: boolean) => void;
	terminals: Terminal[] | [];
}

export interface TerminalModalStates {
	selectedTerminal: Terminal | null;
	loading: boolean;
}

const TerminalsModal: React.FC<TerminalsModalProps> = ({
	show,
	handleShow,
	terminals,
}) => {
	const { user } = useSelector((store: AppStore) => store.auth);
	const [selectedTerminal, setSelectedTerminal] =
		useState<TerminalModalStates['selectedTerminal']>(null);
	const [loading, setLoading] =
		useState<TerminalModalStates['loading']>(false);

	const dispatch = useDispatch();

	const fetchTerminals = async () => {
		setLoading(true);
		const { data } = await axios.get('/devices');
		dispatch(setTerminals(terminalsAdapter(data)));
		const selected = data.find(
			(t: TerminalResponse) => t.isBusy === user.id,
		);
		if (selected) {
			const selectedTerminal = terminalAdapter(selected);
			setSelectedTerminal(selectedTerminal);
			dispatch(setTerminal(selectedTerminal));
		}
		setLoading(false);
	};

	const handleBusyTerminal = async (data: Terminal) => {
		try {
			if (selectedTerminal) {
				//await axios.put(`/api/terminals/free/${selectedTerminal.id}`);
			}
			//await axios.put(`/api/terminals/busy/${data.id}`);
			setSelectedTerminal(data);
			dispatch(setTerminal(data));
			handleShow(false);
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (show) {
			fetchTerminals();
		}
	}, [show]);

	return (
		<Transition appear show={show} as={Fragment}>
			<Dialog
				as='div'
				onClose={() => (selectedTerminal ? handleShow(false) : null)}
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
							<Dialog.Panel className='w-full max-w-md min-h-[200px] transform overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center justify-center'>
								{loading ? (
									<div className='h-28 w-28 border-8 border-slate-500 rounded-full border-r-transparent animate-spin mx-auto'></div>
								) : (
									<>
										<Dialog.Title
											as='h3'
											className='text-lg font-medium leading-6 text-slate-900 dark:text-slate-50'
										>
											Selecciona una terminal
										</Dialog.Title>
										<div className='mt-4 w-full'>
											<div className='space-y-2'>
												{terminals.map((terminal) => (
													<button
														key={terminal.id}
														className={`w-full  text-slate-900 dark:text-slate-50 ${
															terminal.isBusy !== null &&
															user.role !== 'admin'
																? 'cursor-not-allowed border border-slate-300'
																: 'cursor-pointer bg-white  hover:bg-slate-200 dark:bg-slate-500  dark:hover:bg-slate-400 shadow-md'
														} transition-colors relative rounded-lg  px-5 py-4`}
														disabled={
															terminal.isBusy !== null &&
															user.role !== 'admin'
														}
														onClick={() =>
															handleBusyTerminal(terminal)
														}
													>
														<div className='flex items-center justify-between w-full'>
															<div className='text-left'>
																<h5 className='font-bold  text-slate-900 dark:text-slate-50 leading-none'>
																	Terminal {terminal.code}
																</h5>
																<p className='inline text-xs text-slate-500 dark:text-slate-300'>
																	<strong>Base:</strong> ${' '}
																	{terminal.base}
																</p>
															</div>
															{terminal.isBusy !== null &&
																!selectedTerminal && (
																	<span className='text-xs font-extrabold text-slate-700'>
																		OCUPADO
																	</span>
																)}
															{terminal.isBusy !== null &&
																selectedTerminal && (
																	<span className='text-xs font-extrabold text-slate-700'>
																		<CheckCircleIcon className='w-6 h-6 text-slate-900 dark:text-slate-50' />
																	</span>
																)}
														</div>
													</button>
												))}
											</div>
										</div>
									</>
								)}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default TerminalsModal;
