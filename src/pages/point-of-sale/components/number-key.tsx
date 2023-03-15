import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplay } from '@/redux/states/display.slice';
import { AppStore } from '@/redux/store';
import { set } from 'react-hook-form';

type Props = {
    number: number;
};

const NumberKey: React.FC<Props> = ({ number }) => {
    const { value, type, discountOption } = useSelector((store: AppStore) => store.display);

    const dispatch = useDispatch();

    const handleClick = () => {
        if (type === 'Cant' || discountOption === 'Valor') {
            if (value !== '') {
                dispatch(setDisplay(value + String(number)));
            }
            else if (value === '' && number !== 0) {
                dispatch(setDisplay(value + String(number)));
            }
        }

        else if (discountOption === 'Porcentaje') {
            if (value === '') {
                dispatch(setDisplay(value + String(number)));
            }
            else if (value === '0') return
            else {
                dispatch(setDisplay(value + String(number)));
            }
        }
    }

    return (
        <div
            className='flex flex-row justify-center items-center p-0 w-24 h-32 bg-emerald-300 rounded-xl not-italic font-bold text-6xl leading-7 text-white'
            onClick={() => handleClick()}
        >
            {number}
        </div>
    )
}

export default NumberKey
