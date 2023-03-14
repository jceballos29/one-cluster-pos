import React from 'react';
import ClearKey from './clear-key';
import CommaKey from './comma-key';
import ConfirmKey from './confirm-key';
import DeleteKey from './delete-key';
import DiscountKey from './discount-key';
import KeypadDisplay from './keypad-display';
import NumberKey from './number-key';

const Keypad: React.FC = () => {

    let numbers: number[] = [];

    for (let i = 1; i <= 10; i++) {
        numbers.push(i % 10);
    }

    return (
        <div className='flex flex-wrap justify-center items-start gap-3 pt-16'>
            <KeypadDisplay />
            {numbers.map((number) => (
                <NumberKey key={number} number={number} />
            ))}
            <CommaKey />
            <ClearKey />
            <DiscountKey />
            <ConfirmKey />
            <DeleteKey />
        </div>
    );
}

export default Keypad;
