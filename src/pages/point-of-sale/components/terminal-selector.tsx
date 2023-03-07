/** @format */

import { AppStore } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TerminalsModal from './terminals-modal';
import { setTerminal } from '@/redux/states/pos.slice';

const TerminalSelector: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { warehouse, terminal } = useSelector(
		(store: AppStore) => store.pos,
	);

	const handleShow = (state: boolean) => {
		setIsOpen(state);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		if (!terminal) {
			const sessionTerminal =
				warehouse?.terminals?.find(
					(t) => t._id === sessionStorage.getItem('terminal'),
				) || null;
			if (sessionTerminal) {
				handleShow(false);
				dispatch(setTerminal(sessionTerminal));
			} else {
				handleShow(true);
			}
		}
	}, [terminal]);

	return (
		warehouse && (
			<>
				<TerminalsModal
					show={isOpen}
					handleShow={handleShow}
					terminals={warehouse?.terminals || []}
				/>
				<button
					onClick={() => handleShow(true)}
					className='select-none text-left'
				>
					<h2 className='text-3xl leading-none text-slate-900 dark:text-slate-50 font-bold capitalize'>
						{warehouse?.name}
					</h2>
					{terminal && (
						<p className='text-lg leading-none text-slate-500 dark:text-slate-400'>
							Terminal {terminal?.code}
						</p>
					)}
				</button>
			</>
		)
	);
};

export default TerminalSelector;
