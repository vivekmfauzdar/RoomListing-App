import React from 'react'
import support from '../Icons/service.png'

function Support() {
 
 
    return (
    <div>
       <div className='w-[100%] pt-[80px] caret-transparent mb-[100px]'>
          <div className='lg:max-w-[970px] min-w-[400px] mx-auto text-black text-center'>
          <div><h1 className='text-2xl text-red-400 font-bold'>Support</h1></div>
          <div className='grid grid-cols-1 justify-items-center'>
          <img src={support} className='w-[150px] pt-10' alt="" />
          <h2>If you have any query or suggestion <br /> feel free to mail us: <span className='font-semibold'> backsoonqueries@gmail.com</span></h2>
          </div>   
      </div>
      </div>
    </div>
  )
}

export default Support
