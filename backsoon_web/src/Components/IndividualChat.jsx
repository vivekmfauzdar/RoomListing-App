import React from 'react'
import useric from '../Icons/user (6).png'


function IndividualChat(props) {
 
    console.log(props.data)
 
    return (
    <div>
           <div class="bg-white flex items-center gap-3 py-4">
               {props.data != null ? (props.data.profileImage === 'NO Image' ? <img src={useric} className='h-[46px] w-[46px] rounded-full max-w-full' alt="" /> : <img src={props.data.profileImage} className='h-[46px] w-[46px] rounded-full max-w-full' alt="" />) : null } 
               <h1 class="text-center text-2xl font-bold text-black">{props != null ? props.data.name : ""}</h1>
           </div>  
   </div>   
  )
}

export default IndividualChat
