import React from 'react'

type Props = {
    number: number;
};

const NumberKey: React.FC<Props> = ({ number }) => {
    return (
        <div className='flex flex-row justify-center items-center p-0 w-24 h-32
            bg-emerald-300 rounded-xl not-italic font-bold text-6xl leading-7 text-white'
        >
            {number}
        </div>
    )
}

export default NumberKey
