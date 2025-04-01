import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { slug } = useParams();

    return (
        <div>
            <h1>Product Detail</h1>
            <p>Details for product: {slug}</p>
        </div>
    );
};

export default ProductDetail;
