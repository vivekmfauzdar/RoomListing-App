import React, { useState } from 'react'
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import {RxDotFilled} from 'react-icons/rx'


function Slider() {


    const slides = [

        {
            imageUrl: "/q1.png"
            
        },
        {
            imageUrl: "/q2.png"
        }
       
       
    ]

    const [index, setIndex] = useState(0)
  

    function leftBtn(){

        const isFirstSlide = index === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : index - 1;
        setIndex(newIndex)

    }

    function rightBtn(){

        const isLastSlide = index === slides.length - 1;
        const newIndex = isLastSlide ? 0 : index + 1;
        setIndex(newIndex)

    }

    function goToSlide(slideIndex){

        setIndex(slideIndex)
    }
  return (
    <div className='lg:max-w-[970px] min-w-[400px] max-w-[800px] h-[110px] lg:h-[200px] pl-2 pr-2 mt-5 mx-auto'>
      <div style={{backgroundImage: `url(${slides[index].imageUrl})`}} className='py-10 w-full h-full rounded bg-cover bg-center relative group duration-500'>

      {/* LEFT ARROW */}
      <div className='hidden group-hover:block absolute top-[50%] text-white bg-red-600 text-4xl font-semibold rounded-full cursor-pointer' onClick={leftBtn}>
        <BsChevronCompactLeft /> </div>

    
      
      {/* RIGHT ARROW */}
      <div className='hidden group-hover:block absolute top-[50%] right-0 text-white text-4xl font-semibold bg-red-600 rounded-full cursor-pointer' onClick={rightBtn}>
        <BsChevronCompactRight />
      </div>

      </div>

      <div className='flex top-4 justify-center py-'>

      {
         slides.map((curElm, slideIndex) => {

          return <div className='text-2xl cursor-point' key={slideIndex} 
          onClick={()=> goToSlide(slideIndex)}>
         <RxDotFilled />
        </div>

})}
    
        
      </div>
        
    </div>
  )
}

export default Slider
