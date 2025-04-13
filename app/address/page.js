"use client"

import TextInput from "../components/TextInput"
import MainLayout from "../layouts/MainLayout"
import {useUser} from "../context/user"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import useIsLoading from "../hooks/useIsloading"
import useUserAddress from "../hooks/useUserAddress"
import { toast } from "react-toastify"
import useCreateAddress from "../hooks/useCreateAddress"

export default function Address() {
    const router = useRouter()
    const { user } = useUser()

    const [addressId, setAddressId] = useState(null)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [isUpdatingAddress, setIsUpdatingAddress] = useState(false)
    const [error, setError] = useState({})

    const showError = (type) =>{
        if (Object.entries(error).length > 0 && error?.type == type){
            return error.message
        }
        return ''
    }

    const getAddress = async () =>{
        if(user?.id == null || user?.id ==undefined){
            useIsLoading(false)
            return
        }

        const response = await useUserAddress()
        if(response){
            setTheCurrentAddres(response)
            useIsLoading(false)
            return
        }
        useIsLoading(false)
    }

    useEffect(() =>{
        useIsLoading(true)
        getAddress()
    }, [user])

    const setTheCurrentAddres = (result) =>{
        setAddressId(result)
        setName(result.name)
        setAddress(result.address)
        setZipcode(result.zipcode)
        setCity(result.city)
        setCountry(result.country)
    }

    const validate = () =>{
        setError({})
        let isError = false

        if (!name) {
            setError({ type: 'name', message: 'A name is required'})
            isError = true
        } else if (!address) {
            setError({ type: 'address', message: 'An address is required'})
            isError = true
        } else if (!zipcode) {
            setError({ type: 'zipcode', message: 'A zipcode is required'})
            isError = true
        } else if (!city) {
            setError({ type: 'city', message: 'A city is required'})
            isError = true
        } else if (!country) {
            setError({ type: 'country', message: 'A country is required'})
            isError = true
        }
        return isError

    }

    const submit = async(event) =>{
        event.preventDefault();
        let isError = validate()

        if(isError){
            toast.error(error.message, {autoClose: 3000})
            return
        }

        try {
            setIsUpdatingAddress(true)

            const response = await useCreateAddress({
                addressId,
                name,
                address,
                zipcode,
                city,
                country
            })

            setTheCurrentAddres(response)
            setIsUpdatingAddress(false)

            toast.success('Address has been updated!', {autoClose: 3000})

            router.push('/checkout')
        } catch (error) {
            setIsUpdatingAddress(false)
            console.log(error)
            alert(error)
        }
    }


    return(
        <>
            <MainLayout>
                <div
                    id="AddressPage"
                    className="mt-4 max-w-[600px] mx-auto px-2"
                >
                    <div className="mx-auto bg-white rounded-lg p-3">

                        <div className="text-xl text-bold mb-2">Address Details</div>

                        <form>
                            <div className="mb-4">
                                <TextInput
                                    className="w-full"
                                    string={'TEST'}
                                    placeholder="Name"
                                    error="This is an error message"
                                />
                            </div>
                            <button
                                className="
                                mt-6
                                w-full
                                text-white
                                font-semibold
                                p-3
                                rounded
                                bg-blue-600
                            "
                            >
                                Update Address
                            </button>

                
                        </form>
                    </div>

                </div>
            </MainLayout>
        </>
    )


}