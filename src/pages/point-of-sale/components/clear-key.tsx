import React from 'react';
import { useDispatch } from 'react-redux';
import { setDisplay } from '@/redux/states/display.slice';

const ClearKey = () => {
    const dispatch = useDispatch();

    return (
        <div
            className='flex flex-row justify-center items-center p-0 w-24 h-32 bg-pink-300 rounded-xl not-italic font-bold text-6xl leading-7 text-white'
            onClick={() => dispatch(setDisplay(''))}
        >
            C
        </div>
    )
}

export default ClearKey
