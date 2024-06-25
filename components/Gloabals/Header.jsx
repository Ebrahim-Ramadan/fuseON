import React from 'react'
import { Loader, Product } from './globals';

export const Header = () => {

  return (
    <div className='p-2 md:px-40 bg-black/10 backdrop-blur-3xl fixed top-0 left-0 z-50  flex  w-full  items-center justify-between'>
      <div>
       <Product/>
      </div>
      <div className='flex flex-col items-center px-2'>
        <h1 className='font-medium text-base md:text-lg'>320220029</h1>
        <p className='text-gray-200 text-xs md:text-sm'>ahmedramadan@gmail.com</p>
      </div>
    </div>
  )
}
