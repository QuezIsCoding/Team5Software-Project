"use client"

import { useRouter } from "next/navigation"
import { createContext, useState, useContext } from "react"

const Context = createContext()

const Provider = ({ children }) => {
    const router = useRouter()

    const [isItemAdded, setIsItemAdded] = useState(false)

    const getCart = () => {
        if (typeof window === "undefined") return [];

        try {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            return cart.filter(item => item && item.id); // filter out invalid items
        } catch (e) {
            console.error("Error parsing cart from localStorage:", e);
            return [];
        }
    };

    const addToCart = (product) => {
        let cart = []
        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem("cart")) || []
        }
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        isItemAddedToCart(product)
        router.refresh()
    }

    const removeFromCart = (product) => {
        let cart = []
        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem("cart")) || []
        }
        cart = cart.filter(item => item && item.id !== product.id);
        localStorage.setItem('cart', JSON.stringify(cart));
        isItemAddedToCart(product)
        router.refresh()
    }

    const isItemAddedToCart = (product) => {
        let cart = []
        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem("cart")) || []
        }
        cart = cart.filter(item => item && item.id === product.id);

        if (cart.length > 0) {
            setIsItemAdded(true)
            return
        }
        setIsItemAdded(false)
    }

    const cartCount = () => {
        let cart = []
        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem("cart")) || []
        }
        return cart.filter(item => item && item.id).length;
    }

    const cartTotal = () => {
        let total = 0;
        let cart = [];

        if (typeof window !== "undefined") {
            try {
                cart = JSON.parse(localStorage.getItem("cart")) || [];
            } catch (e) {
                console.error("Error reading cart from localStorage:", e);
            }
        }

        for (let i = 0; i < cart.length; i++) {
            const element = cart[i];
            if (!element || typeof element.price !== 'number') continue; // Skip bad entries
            total += element.price;
        }

        return total;
    };

    const clearCart = () => {
        localStorage.removeItem('cart')
        router.refresh()
    }

    const exposed = {
        isItemAdded,
        getCart,
        isItemAddedToCart,
        addToCart,
        removeFromCart,
        cartCount,
        cartTotal,
        clearCart
    }

    return <Context.Provider value={exposed}>{children}</Context.Provider>
}

export const useCart = () => useContext(Context)

export default Provider;
