import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Zoom, Slide } from 'react-slideshow-image';
import { GrLocationPin } from "react-icons/gr";
import ac from '../Icons/air-conditioner.png'
import wifi from '../Icons/wifi.png'
import bathtub from '../Icons/bathtub.png'
import gym from '../Icons/dumbbell.png'
import parking from '../Icons/parking.png'
import lift from '../Icons/elevator.png'
import user from '../Images/usericon1.png'
import insta from '../Icons/instagram.png'
import fb from '../Icons/facebook.png'
import whatsapp from '../Icons/whatsapp.png'
import { dataref } from '../firebase';
import Button from '@mui/material/Button';
import ForumIcon from '@mui/icons-material/Forum';
import PhoneIcon from '@mui/icons-material/Phone';
import Stack from '@mui/material/Stack';
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import  Login  from '../Components/Login';



function MoreDetails() {
 
    const location = useLocation();
    const navigate = useNavigate()
    const [listingUser, setListingUser] = useState({})
    const [user, setUser] = useState('')
  

    const { pathname } = useLocation();

    useEffect(()=>{

      const auth = getAuth();
      
      let curUser = auth.onAuthStateChanged((user)=> {
  
        if(user){

              setUser(user)

        }
        else{

          setUser(null)
  
        }
      })
  
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

    const divStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      objectFit: 'cover',
      height: '400px',
    }

    // getting the name of listing owner
    useEffect(() => {

      GetData()
    }, [])

    const GetData = async() => {

      const receiverUid = location.state.curElm.uid;
      const docRef = doc(dataref, "Users", receiverUid);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){

        setListingUser(docSnap.data())
      }
        
    }

    console.log(listingUser)


    const GoToChat = () => {


       navigate("/chat", {state : { name : listingUser.name, uid : listingUser.uid, profileImage : listingUser.profileImage}})


    }


    
 
    return (

      <div className='w-[100%] pt-[0px] caret-transparent mb-[50px]'>
      <div className='lg:max-w-[970px] min-w-[400px]  mx-auto text-black text-center'>

      <div className="slide-container pb-5">
       
       <Slide autoplay={false} canSwipe={true} className='slider' cssClass='slider'>
        {location.state.curElm.imageurl.map((slideImage, index)=> (
           <div key={index}>
             <div  style={{...divStyle, 'backgroundImage': `url(${slideImage})`}}>
             </div>
           </div>
         ))} 
       </Slide>

     </div>

     <div className='text-left pl-5'>
       <h1 className='text-2xl'>₹ {location.state.curElm.rent} /- month</h1>
       <h1 className='text-2xl font-semibold'>{location.state.curElm.title}</h1>
     </div>

     <div className='flex items-center pl-5 text-xl relative'>
            <GrLocationPin />
            <p className=''>{location.state.curElm.location}</p>
      </div>

      <div className='mt-[3rem]'>
      <hr className='border-2 border-solid border-(#C7C4C4)'/>
        <div className='grid grid-cols-3 divide-x-2 pt-5 pb-5'>
           <div className=''> 
            <h2 className='font-semibold lg:text-2xl text-xl'>{location.state.curElm.rooms}</h2>
            <h2 >Rooms</h2>
          </div>
          
          <div>
            <h2 className='font-semibold lg:text-2xl text-xl'>{location.state.curElm.bathrooms}</h2>
            <h2>Bathrooms</h2>
          </div>
          <div>
            <h2 className='font-semibold lg:text-2xl text-xl'>{location.state.curElm.kitchen}</h2>
            <h2>Kitchen</h2>
          </div>
        </div>
        <hr className='border-2 border-solid border-(#C7C4C4)'/>

        <div className='grid grid-cols-3 pt-5 pb-5 divide-x-2'>
           <div>
            <h1 className='font-semibold lg:text-2xl text-xl'>{location.state.curElm.tenants}</h1>
            <h2 className=' text-(#06094D)'>Preferred Tenants</h2>
          </div>
          <div>
            <h2 className='font-semibold lg:text-2xl text-xl'>{location.state.curElm.balcony}</h2>
            <h2 >Balcony</h2>
          </div>
          <div>
            <h2 className='font-semibold lg:text-2xl text-xl'>{location.state.curElm.parking}</h2>
            <h2>Parking</h2>
          </div>
        </div>
        <hr className='border-2 border-solid border-(#C7C4C4)'/>
 
      </div>

      <div className=''>

        <div className='grid lg:grid-cols-2 grid-cols-1 gap-10 pl-5 mt-5'> 

        <div>
         <h1 className='text-left text-2xl font-semibold pb-5 mt-[3rem]'>Facilities</h1>
         <div className='grid grid-cols-2 gap-4'>
            <div className='grid grid-cols-1 gap-4'>           
           {
            location.state.curElm.wificheck === "Wi-Fi" ?  <div className='flex items-center gap-3'>
             <img src={wifi} className='w-[30px]' alt="" />
             <h2>Wi-Fi</h2>
            </div>  : null
           }
            

           {
            location.state.curElm.accheck === "Air-Conditioner" ? <div className='flex items-center gap-3'>
            <img src={ac} className='w-[30px]' alt="" />
            <h2>Air-Conditioner</h2>
           </div>   : null
           }
            
           {
            location.state.curElm.gymcheck === "Gym" ?  <div className='flex items-center gap-3'>
            <img src={gym} className='w-[30px]' alt="" />
            <h2>Gym</h2>
           </div> : null
           }
            

         </div>

         <div className='grid grid-cols-1 gap-4'>
          
          {
            location.state.curElm.parkingcheck === "Parking" ?  <div className='flex items-center gap-3'>
             <img src={parking} className='w-[30px]' alt="" />
             <h2>Parking</h2>
            </div>: null
           }
             

           {
            location.state.curElm.elevatorcheck === "Elevator" ?   <div className='flex items-center gap-3'>
            <img src={lift} className='w-[30px]' alt="" />
            <h2>Lift</h2>
           </div> : null
           }
          
           {
            location.state.curElm.prvtbathcheck === "Private Bathroom" ?  <div className='flex items-center gap-3'>
            <img src={bathtub} className='w-[30px]' alt="" />
            <h2>Bathroom</h2>
           </div> : null
           }
                 
          </div>
         </div>
        </div>
  

          <div className='grid grid-cols-1 gap-5 mt-[3rem]'>
            <h1 className='text-xl font-semibold text-left'>More Details</h1>
           
             <div className='flex gap-2'>
               <h1 >Type :</h1>
               <h1 className='text-xl font-semibold'>{location.state.curElm.type}</h1>
             </div>
             <div className='flex gap-2'>
               <h1>Furnishing :</h1>
               <h1 className='text-xl font-semibold'>{location.state.curElm.furnishing}</h1>
             </div>
          </div>

        </div>
        </div>


       <div className='flex pt-[60px] ml-3'>
        <div>
          <h1 className='text-xl font-semibold text-left pb-5'>Description</h1>
          <div>
            <p className='text-left'>{location.state.curElm.description}</p>
          </div>
          </div>
       </div> 

       <div className='mt-[3rem] p-10 grid grid-cols-1 lg:grid-cols-2 shadow rounded items-center'>
        <div>
         <h1 className='text-xl font-semibold text-left'>Listed By</h1>
         <div className='flex items-center'>
         {
           listingUser.profileImage === "NO Image" ? <img src={user} className='w-[70px]' alt="" /> : <img src={listingUser.profileImage} className='w-[70px]' alt="" />

         }
         <h1>{listingUser.name}</h1>
         </div>
         </div> 

         <div>
           <h1 className='text-xl font-semibold text-left pb-3'>Contact the Owner</h1>
           <div className='grid grid-cols-2 gap-3 items-center'>
           {/* <button className='text-white rounded bg-red-400 px-4 py-2 font-semibold mt-5 hover:bg-red-900'>Chat Now</button>
           <button className='text-white rounded bg-red-400 px-4 py-2 font-semibold mt-5 hover:bg-red-900'>Call Now</button>
           */}
           {
             user !== null ?  <Button style={{backgroundColor: "#FF5757", color: "white", textTransform: "capitalize"}} variant="contained" startIcon={<ForumIcon />} onClick={GoToChat}>
          Chat Now
          </Button> : navigate("/login")
           }
         
          <Button style={{backgroundColor: "#FF5757", color: "white", textTransform: "capitalize"}} variant="contained" startIcon={<PhoneIcon />}>
               <a href="tel:+919999942413">Call Now</a>
          </Button>
         
           </div>
         </div>
        
       </div>
         

       <div className='mt-10'>
          <h1 className='text-xl font-semibold text-center'>Share This Listing</h1>
         
          <div className='flex gap-2 justify-center mt-3'> 
           <img src={whatsapp} className='w-[40px]' alt="" />
           <img src={fb} className='w-[40px]' alt="" />
           <img src={insta} className='w-[40px]' alt="" />
          </div>
          
       
        </div>

        </div>  

       
      </div>
    
  )
}

export default MoreDetails
