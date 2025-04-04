"use client";

import Link from 'next/link';

export default function TextInput({ string, placeholder, error, onUpdate }) {
    
    return (
        <>
            <input
              placeholder={placeholder} 
              className="
              w-full
              bg-white
              border
              text-gray-800
              text-sm
              border-[#272727]
              p-3
              placeholder-gray-500
              focus:outline-none
              "
              value={string ||''}
              onChange={(event) => onUpdate(event.target.value)}
              type='text'
              autoComplete='off'
            />
            <div className='text-red-500 text=[14px] font-semibold'>
                {error ?(error):null}
            </div>
        </>
        
    )
}
