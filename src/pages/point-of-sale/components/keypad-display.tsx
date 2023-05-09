import { AppStore } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

const KeypadDisplay = () => {
    const { value, type, discountOption } = useSelector((store: AppStore) => store.display);

    return (
        <div className='relative flex flex-row justify-end items-end pb-4 pr-4 w-full h-32
            bg-blue-200 rounded-xl not-italic text-4xl leading-7 text-black'
        >
            <div className='absolute inset-0 flex flex-row justify-center items-center m-3 w-20 h-10
            bg-orange-200 rounded-xl not-italic font-bold text-xl text-black'>
                {type}
            </div>
            {discountOption === 'Valor' ?
                `$ ${value}`
                :
                discountOption === 'Porcentaje' ?
                    `${value} %`
                    :
                    `${value}`
            }
        </div>
    );
};

export default KeypadDisplay;
