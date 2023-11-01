import React from 'react'
import { AiOutlineInstagram } from "react-icons/ai";
import { BsInstagram,BsFacebook,BsYoutube } from "react-icons/bs";
import googlebadge from '../Images/googlePlayBadge.png'
import { NavLink, useNavigate } from 'react-router-dom';


function Footer() {
  return (
    <>
    <div className='w-[100%] pt-[80px] caret-transparent shadow-3xl'>

    <div className='max-w-full grid items-center justify-items-center'>
       <div>
        <nav>
             <ul class="flex mb-5 cursor-pointer">
               <NavLink to='/about_backsoon'><li className='px-5 hover:underline hover:text-red-400'>About Backsoon</li></NavLink>
               <NavLink to='/support'><li className='px-5 hover:underline hover:text-red-400'>Support</li></NavLink>
               <NavLink to='/terms_conditions'><li className='px-5 hover:underline hover:text-red-400'>Terms & Conditions</li></NavLink>
               {/* <li className='px-5'>Privacy Policy</li> */}
               <NavLink to='/faq'><li className='px-5 hover:underline hover:text-red-400'>FAQs</li></NavLink>
            </ul>
        </nav>
       </div>

      

       <div className='flex space-x-2 items-center text-3xl py-10'>
           <a href="https://www.instagram.com/backsoon.in/" target='_blank' rel="noreferrer"><BsInstagram className='cursor-pointer' /></a>
          
           {/* <a href="https://plainenglish.io" target="_blank" rel="noreferrer"><BsFacebook className='cursor-pointer'/></a> */}
           <a href="https://www.youtube.com/@BacksoonApp" target="_blank" rel="noreferrer"><BsYoutube className='cursor-pointer'/></a>
           <div className=''>
           <a href="https://play.google.com/store/apps/details?id=com.shrihari.backsoon" target='_blank' rel="noreferrer"><img className='w-[120px] cursor-pointer' src={googlebadge} alt="" /></a>
           </div>
       </div>

       <div className='flex pb-10'>
          <p>Copyright © 2023 Backsoon.in</p>
       </div>
    </div>

    </div>
    </>
  )
}

export default Footer
