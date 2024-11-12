"use client"

import CheckoutItem from "../components/CheckoutItem"
import MainLayout from "../layouts/MainLayout"

export default function Checkout() {
    const product = {
        id: 1,
        title: 'Brown Leather Bag',
        description: 'This is where user describes the product',
        url: 'https://picsum.photos/id/7',
        price: 1999,
    }  
    return (
        <MainLayout>
            <div id="CheckoutPage" className=" mt-4 max-w-[1100px] mx-auto">
                <div className=" text-2xl font-bold mt-4 mb-4">Checkout</div>
                <div className=" relative flex items-baseline gap-4 justify-between mx-auto w-full">
                    <div className="w-[65%]">
                        <div className="bg-white rounded-lg  p-4 border">

                            <div className="text-xl font-semibold mb-2"> Shipping Address </div>
                            <div>
                                <ul className="text-sm mt-2">
                                    <li>Name: test</li>
                                    <li>Address: test</li>
                                    <li>Zipcode: test</li>
                                    <li>City: test</li>
                                    <li>Country: test</li>
                                </ul>
                            </div>
                        </div>
                    <div id="Items" className="bg-white rounded-lg mt-4">
                        <CheckoutItem key={product.id} product={product}/>
                    </div>
                    </div>

                    <div id="PlaceOrder" className="relative -top-[6px] w-[35%] border rounded-lg">
                        <div className="p-4">
                            <div className="flex items-baseline justify-between text-sm mb-1">
                                <div>Items (1)</div>
                                <div>$19.99   </div>
                            </div>

                            <div className="flex items-center justify-between mb-4 text-sm">
                                <div>Shipping (1)</div>
                                <div>Free </div>
                            </div>

                            <div className="border-t"></div>
                            <div className="flex items-center justify-between my-4">
                                <div className="font-semibold">Order Total</div>
                                <div className="text-2xl font-semibold"> $19.99</div>
                            </div>

                            <form>
                                <div
                                    className="border border-gray-500 p-2 rounded-sm"
                                    id="card-element"
                                />

                                <p
                                    id="card-errors"
                                    role="alert"
                                    className="text-red-700 text-center font-semibold relative top-2"
                                />
                                <button
                                    type ="submit"
                                    className="mt-4 bg-blue-600 text-lg w-full text-white font-semibold rounded-full"
                                >
                                    Confirm and pay
                                </button>
                            </form>
                        </div>

                        <div className="flex items-center p-4 justify-center gap-2 border-t">
                            <img width={1000} src="/images/checkout.png" />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}