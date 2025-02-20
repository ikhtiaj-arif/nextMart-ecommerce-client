import ManageProducts from '@/components/modules/shop/products';
import { getAllProducts } from '@/services/Product';
import React from 'react';

const ProductsPage = async () => {
     const { data, meta } = await getAllProducts()
    return (
        <div>
           <ManageProducts products={data}/>
        </div>
    );
};

export default ProductsPage;