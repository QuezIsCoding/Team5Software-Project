"use client"

import Link from "next/link";
import { useState } from 'react';
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";


const TopMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // Initial dropdown state

  const toggleDropdown = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <nav id="TopMenu" className="border-b w-full">
      <div className="flex items-center justify-between w-full mx-auto px-4"> 
        <ul id="TopMenuLeft"
            className="flex items-center text-[11px] text-[#333333] h-8">
          <li className="relative px-3">
            <Link href="/auth" className="flex items-center gap-2 hover:underline cursor-pointer" onClick={(event) => {toggleDropdown(); event,preventDefault();}}>
              <span>Login/Signup</span>
              <BsChevronDown />
            </Link>

            {isOpen && (
              <div
                id="dropdown"
                className="absolute bg-white w-[200px] text-[#333333] z-40 left-0 border shadow-lg"
              >
                <div className="flex items-center justify-start gap-1 p-3">
                  <img width="50" src="https://picsum.photos/200" alt="User Avatar" />
                  <div className="font-bold text-[13px]">Peter Parker</div>
                </div>

                <div className="border-b" />

                <ul className="bg-white">
                  <li className="text-[11px] py-2 px-4 w-full hover:underline text-blue-500 cursor-pointer">
                    <Link href="/orders">
                      My Orders                     
                    </Link>
                  </li>
                  <li className="text-[11px] py-2 px-4 w-full hover:underline text-blue-500 cursor-pointer">
                    Sign out
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="px-3 hover:underline cursor-pointer"> 
            Your Campus
          </li>
          <li className="px-3 hover:underline cursor-pointer"> 
            Help and Contact
          </li> 
        </ul>

        <ul
          id="TopMenuRight"
          className="flex items-center text-[11px] text-[#333333] h-8"
        >
          <li className="flex items-center gap-2 px-3 hover:underline cursor-pointer">
            <img width="32" src="/images/USA.png" alt="USA Flag" />
            Ship to
          </li>
          <li className="px-3 hover-underline cursor-pointer">
            <div className="relative">
                <AiOutlineShoppingCart size={24}/>
                <div className="absolute text-[10px] -top-[2px] -right-[5px] bg-red-500 w-[14px] h-[14px] rounded-full text-white">    
                    <div className= "flex items-center justify-center -mt-[1px]" > 3</div>
                </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopMenu;
