import React from 'react';
import trashCan from '@/assets/trash-can.svg'

const DeleteKey = () => {
    return (
        <div className='flex flex-row justify-center items-center p-0 w-24 h-32
            bg-pink-600 rounded-xl not-italic font-bold text-6xl leading-7 text-white'
        >
            <img src={trashCan} />
        </div>
    );
}

export default DeleteKey;
