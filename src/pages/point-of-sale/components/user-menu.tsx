/** @format */

import { AppStore } from '@/redux/store';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import defaultAvatar from '@/assets/default-avatar.jpg';
import useCallAndLoad from '@/hooks/useCallAndLoad';
import { logout as logoutService } from '@/services/auth.service';
import { logout } from '@/redux/states/auth.slice';

const UserMenu: React.FC = () => {
	const { user } = useSelector((store: AppStore) => store.auth);
	const dispatch = useDispatch();

	const { loading, callEndpoint } = useCallAndLoad();

	const handleLogout = async () => {
		try {
			const response = await callEndpoint(logoutService());
			if (response) {
				dispatch(logout());
				sessionStorage.removeItem('terminal');
			}
		} catch (error) {}
	};

	return (
		<Menu as='div' className='relative'>
			<Menu.Button className='flex items-center justify-center w-10 h-10 bg-white dark:bg-slate-500 transition-color shadow rounded-lg overflow-hidden'>
				<img
					src={user?.avatar || defaultAvatar}
					alt='avatar'
					className='w-full h-full object-cover'
				/>
			</Menu.Button>
			<Transition
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-lg bg-white dark:bg-slate-500 p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
					<Menu.Item>
						<div className='w-full flex items-center justify-start select-none'>
							<figure className='h-16 aspect-square rounded-lg overflow-hidden'>
								<img
									src={user?.avatar || defaultAvatar}
									alt='avatar'
									className='w-full h-full object-cover'
								/>
							</figure>
							<div className='ml-4'>
								<h4 className='font-medium text-lg text-slate-900 dark:text-white leading-none capitalize'>
									{user?.name}
								</h4>
								<p className='text-sm font-light text-slate-500 dark:text-white capitalize'>
									{user?.role}
								</p>
							</div>
						</div>
					</Menu.Item>
					<Menu.Item>
						<button
							onClick={handleLogout}
							className={`w-full flex items-center justify-center text-white font-medium ${
								loading ? 'bg-slate-500' : 'bg-red-600'
							} rounded-md px-3 py-2 mt-4`}
							disabled={loading}
						>
							{loading ? (
								<>
									<span className='flex w-5 h-5 items-center justify-center border-4 border-white border-l-transparent rounded-full mr-4 animate-spin' />
									<span>Cargando...</span>
								</>
							) : (
								'Cerrar sesión'
							)}
						</button>
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default UserMenu;
