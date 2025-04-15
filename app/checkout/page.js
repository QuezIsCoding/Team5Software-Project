"use client"

import { useUser } from "../context/user"
import CheckoutItem from "../components/CheckoutItem"
import MainLayout from "../layouts/MainLayout"
import { useCart } from "../context/cart"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import useIsLoading from "../hooks/useIsLoading"
import useUserAddress from "../hooks/useUserAddress"
import { loadStripe } from "@stripe/stripe-js"

export default function Checkout() {

    const user = useUser();
    const cart = useCart();
    const router = useRouter()

    let stripe = useRef(null)
    let elements = useRef(null)
    let card = useRef(null)
    let clientSecret = useRef(null)

    const [addressDetails, setAddressDetails] = useState({})
    const [isLoadingAddress, setIsLoadingAddress] = useState(false)

    useEffect(() => {
        if(cart.cartTotal() <=0){
            toast.error("Your cart is empty! Add items to continue", {autoClose:3000})
            return router.push('/')
        }

        useIsLoading(true)

        const getAddress = async () => {
            if (user?.id ==null || user?.id ==undefined){
                useIsLoading(false)
                return
            }

            setIsLoadingAddress(true)
            const response = await useUserAddress()
            if (response) setAddressDetails(response)
            setIsLoadingAddress(false)
        }

        getAddress()
        setTimeout(() => stripeInit(),300)
    },[user])

    ///stopped here 4/15
    const stripeInit = async ()  =>{
        stripe.current = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK_KEY||'')

        const response = await fetch('/api/stripe',{
            method: 'POST',
            body:JSON.stringify({amount:cart.cartTotal()})
        })
        const result = await response.json()

        clientSecret.current = result.client_secret
        elements.current = stripe.current.elements();

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