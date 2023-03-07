/** @format */

import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export interface ThemeButtonProps {
	width: number;
}

export interface ThemeButtonState {
	dark: boolean;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ width }) => {
	const [dark, setDark] = useState<ThemeButtonState['dark']>(false);

	const handleTheme = () => {
		if (dark) {
			document.documentElement.classList.remove('dark');
			localStorage.removeItem('dark');
		} else {
			document.documentElement.classList.add('dark');
			localStorage.setItem('dark', 'true');
		}
		setDark(!dark);
	};

	useEffect(() => {
		const validateTheme = () => {
			const dark = localStorage.getItem('dark');
			if (dark) {
				document.documentElement.classList.add('dark');
				setDark(true);
			}
		};

		validateTheme();
	}, []);

	return (
		<button
			onClick={handleTheme}
			className={`w-${width} aspect-square bg-white dark:bg-slate-500 transition-colors shadow rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-400`}
		>
			{dark ? (
				<SunIcon className='w-5 h-5 text-slate-900 dark:text-slate-50' />
			) : (
				<MoonIcon className='w-5 h-5 text-slate-900 dark:text-slate-50' />
			)}
		</button>
	);
};

export default ThemeButton;
