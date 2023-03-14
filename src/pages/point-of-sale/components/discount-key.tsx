import React, { useState } from 'react'
import DiscountModal from './discount-modal'

const DiscountKey = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleShow = (state: boolean) => {
        setIsOpen(state);
    };

    return (
        <>
            <DiscountModal
                show={isOpen}
                handleShow={handleShow}
            />
            <div
                className='flex flex-row justify-center items-center p-0 w-24 h-32 not-italic font-bold leading-7 bg-blue-400 rounded-xl not-italic font-bold text-2xl text-white'
                onClick={() => handleShow(!isOpen)}
            >
                Desct.
            </div>
        </>
    )
}

export default DiscountKey
