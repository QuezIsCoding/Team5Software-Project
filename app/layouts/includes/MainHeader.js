"use client"

import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";

const MainHeader = () => {
  return (
    <nav id="MainHeader" className="border-b w-full">
      <div className="flex items-center justify-between w-full mx-auto px-4">
        <div className="flex items-center">
          <div className="logo-container mr-4">
            <Link href="/">
              <img width="80" src="/images/A&MLogo.png" alt="E-commerce Logo" />
            </Link>

            <div className="w-full"> 
                <div className="relative">
                    <div className=" flex items-center">
                        <div className="relative flex items-center border-2 border-gray-900 w-full p-2"> 
                            <button className="flex items-center">
                                <AiOutlineSearch size={23}/>    
                            </button> 

                            <input className="w-full placeholder-gray-400 pl-3 pr-10 text-sm focus:outline-none" type="text" placeholder="Search products..." />        
                        </div> 
                        
                        <button className="flex items-center bg-blue-600 text-sm font-semibold text-white p-[11px] ml-2 px-13">
                            Search
                        </button>

                        <div className="text-xs px-2 hover:text-blue-500 cursor-pointer">Advanced</div>
                    </div>
                </div>
            </div>
          </div>
          <ul className="flex items-center text-[13px] text-[#333333] h-8 ml-4">
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
