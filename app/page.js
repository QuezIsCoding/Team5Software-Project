"use client";

import { useEffect, useState } from 'react';
import CarouselComp from './components/CarouselComp';
import Products from './components/Products';
import MainLayout from './layouts/MainLayout';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        setLoading(true); 

        try {
            const response = await fetch('/api/products');
            const prods = await response.json(); 
            setProducts(prods);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }

        setLoading(false);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <MainLayout>
            <CarouselComp />

            <div className='max-w-[1200px] mx-auto'>
                <div className='text-2xl font-bold mt-4 mb-6 px-4'>Products</div>

                {loading ? (
                    <div className="px-4">Loading products...</div>
                ) : (
                    <div className='grid grid-cols-5 gap-4 px-4'>
                        {products.map(product => (
                            <Products key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
