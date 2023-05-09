/** @format */

import { setSelectedClient } from '@/redux/states/pos.slice';
import { AppStore } from '@/redux/store';
import { Client } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface ClientsModalProps {
	show: boolean;
	handleShow: (state: boolean) => void;
}

const ClientsModal: React.FC<ClientsModalProps> = ({
	show,
	handleShow,
}) => {
	const { clients, selectedClient } = useSelector(
		(store: AppStore) => store.pos,
	);

	const dispatch = useDispatch();

	const handlerSelectClient = (client: Client) => {
		dispatch(setSelectedClient(client));
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
							<Dialog.Panel className='w-full max-w-md min-h-[200px] transform overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center justify-center'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-slate-900 dark:text-slate-50'
								>
									Selecciona un cliente
								</Dialog.Title>
								<div className='mt-4 w-full'>
									<div className='space-y-2'>
										{clients.map((client) => (
											<button
												key={client.id}
												onClick={() => handlerSelectClient(client)}
												className={`block w-full py-4 border rounded-lg capitalize shadow-md font-bold text-base ${
													selectedClient?.id === client.id
														? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-50'
														: 'bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-50'
												}`}
											>
												{client.name}
											</button>
										))}
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ClientsModal;
