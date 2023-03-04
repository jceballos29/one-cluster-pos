/** @format */

import React, { useState } from 'react';
import {
	ArrowsPointingOutIcon,
	ArrowsPointingInIcon,
} from '@heroicons/react/24/solid';

export interface FullScreenButtonProps {
	width: number;
}

export interface FullScreenButtonState {
	fullScreen: boolean;
}

const FullScreenButton: React.FC<FullScreenButtonProps> = ({
	width,
}) => {
	const [fullScreen, setFullScreen] =
		useState<FullScreenButtonState['fullScreen']>(false);

	const handleFullScreen = () => {
		if (fullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setFullScreen(!fullScreen);
	};

	return (
		<button
			onClick={handleFullScreen}
			className={`w-${width} aspect-square bg-white dark:bg-slate-500 transition-colors shadow rounded-lg flex items-center justify-center`}
		>
			{fullScreen ? (
				<ArrowsPointingInIcon className='w-5 h-5 text-gray-900 dark:text-white' />
			) : (
				<ArrowsPointingOutIcon className='w-5 h-5 text-gray-900 dark:text-white' />
			)}
		</button>
	);
};

export default FullScreenButton;
