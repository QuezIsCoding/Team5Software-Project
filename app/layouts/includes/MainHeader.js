"use client";

import debounce from "debounce";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";

const MainHeader = () => {

  const [items, setItems] = useState([])
  const [isSearching, setIsSearching] = useState(null)

  const handleSearchName = debounce ( async (event) =>{
    if(event.target.value =="") {
      setItems([])
      return
    }
    setIsSearching(true)

    try {
        const response = await fetch(`/api/products/search-by-name/${event.target.value}`)
        const result = await response.json()

        if (result){
          setItems(result)
          setIsSearching(false)
          return
        }
        setItems([])
        setIsSearching(false)

    } catch (error) {
        console.log(error)
        alert(error)
    }
  }, 500)

  return (
    <nav id="MainHeader" className="border-b w-full">
      <div className="flex items-center justify-between w-full mx-auto px-4 py-2">
        {/* Logo + Site Name */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <img
              width="60"
              src="/images/A&MLogo.png"
              alt="E-commerce Logo"
              className="inline-block"
            />
            <span className="text-4xl font-bold text-red-800">UniShop</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-[700px] ml-6">
          <div className="flex items-center">
            <div className="flex items-center border-2 border-gray-900 w-full p-2">
              <button className="flex items-center">
                <AiOutlineSearch size={23} />
              </button>

              <input
                className="w-full placeholder-gray-400 pl-3 pr-10 text-sm focus:outline-none"
                onChange={handleSearchName}
                type="text"
                placeholder="Search products..."
              />

              {isSearching ? <BiLoaderCircle className="mr-2 animate-spin" size ={22} /> : null}
              {items.length > 0 ?
                  <div className="absolute bg-white max-w-[910px] h-auto w-full z-20 left-=0 top-12 border p-1">
                      {items.map((item) =>
                          <div className="p-1" key={item.id}>
                              <Link
                                  href={`/products/${item?.id}`}
                                  className="flex items-center justify-between w-full cursor-pointer hover:bg-gray-200- p-1 px-2"
                              >
                                <div className="flex items-center">
                                    <img className="rounded-md" width="40" src={item?.url+'/40'} />
                                    <div className="truncate ml-2">{item?.title}</div>
                                </div>
                                <div className="truncate"> ${ (item?.price/100).toFixed(2)}</div>
                              </Link>
                          </div>
                      )}
                  </div>
              : null}
            </div>

            <button className="bg-blue-600 text-sm font-semibold text-white py-[11px] px-7 ml-2">
              Search
            </button>

            <div className="text-xs px-2 hover:text-blue-500 cursor-pointer">
              Advanced
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
