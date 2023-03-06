import React from 'react';
import { categories, products } from '../../../data';
import ProductTile from './product-tile';

const Products = () => {
    return (
        <div
            className='flex flex-wrap items-start p-0 pt-2 overflow-y-scroll flex-none order-1 flex-grow-0'
            style={{
                gap: '24px',
                width: '672px',
                height: '892px'
            }}
        >
            {products.map((product) => (
                <ProductTile key={product.id} product = {product} />
            ))}
        </div>
    );
}

export default Products;