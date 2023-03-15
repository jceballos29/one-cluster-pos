import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplay } from '@/redux/states/display.slice';
import { AppStore } from '@/redux/store';

const CommaKey = () => {
    const { value, discountOption } = useSelector((store: AppStore) => store.display);

    const dispatch = useDispatch();

    const handleClick = () => {
        if (discountOption === 'Porcentaje' && value === '') {
            dispatch(setDisplay(value + '0,')) 
        }
        else if (/^[0-9]+$/.test(value)) {
            dispatch(setDisplay(value + ','))
        }
    }

    return (
        <div
            className='flex flex-row justify-center items-center p-0 w-24 h-32 bg-emerald-300 rounded-xl not-italic font-bold text-6xl leading-7 text-white'
            onClick={() => handleClick()}
        >
            ,
        </div>
    )
}

export default CommaKey
