"use client";

import CarouselComp from './components/CarouselComp';
import Products from './components/Products';
import MainLayout from './layouts/MainLayout';

export default function Home() {
    const products = [
        {
            id: 1,
            title: 'Brown Leather Bag',
            description: 'This is where user describes the product',
            url: 'https://picsum.photos/id/7',
            price: 1999,
        },
        {
            id: 2,
            title: 'School Books',
            description: 'This is where user describes the product',
            url: 'https://picsum.photos/id/20',
            price: 2999,
        }
        // Add more products here...
    ];

    return (
        <MainLayout>
            <CarouselComp />

            <div className='max-w-[1200px] mx-auto'>
                <div className='text-2xl font-bold mt-4 mb-6 px-4'>Products</div>

                <div className='grid grid-cols-5 gap-4'>
                    {products.map(product => (
                        <Products key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
