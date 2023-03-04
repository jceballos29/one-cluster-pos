/** @format */

import React from 'react';
import FullScreenButton from './full-screen-button';
import ThemeButton from './theme-button';
import UserMenu from './user-menu';
import TerminalSelector from './terminal-selector';

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
	return (
		<nav className='w-full fixed z-10 flex items-start justify-between p-6 pr-[512px]'>
			<TerminalSelector />
			<div className='w-full max-w-lg h-10 bg-white shadow rounded-xl'></div>
			<div className='flex gap-3'>
				<FullScreenButton width={10} />
				<ThemeButton width={10} />
				<UserMenu />
			</div>
		</nav>
	);
};

export default Navbar;
