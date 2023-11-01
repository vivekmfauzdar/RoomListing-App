import React, { useEffect, useState } from 'react'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { GrLocationPin } from "react-icons/gr";
import { useLocation, useNavigate } from 'react-router-dom';
import { Zoom, Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { dataref } from '../firebase';
import { getAuth } from 'firebase/auth';
import search from '../Icons/sad.png'
import {toast, Toaster} from 'react-hot-toast'

function SearchRooms() {


  const location = useLocation()

    const [firebaseData, setFirebaseData] = useState([])
    const [currentUser, setCurrentUser] = useState('')
    const [wishlist, setWishlist] = useState(Array(firebaseData.length).fill(false));

    const searchInput = location.state.searchInput;


    const navigate = useNavigate()


    //Getting the current user
     // Getting the current user
  useEffect(()=> {

    const auth = getAuth()

    const curUser = auth.onAuthStateChanged((user) => {

      if(user){

        setCurrentUser(user.uid)

      }else{

        setCurrentUser(null)
      }
    })
  }, [currentUser])


    const AddWishlist = (curUserData, i , e) => {

      if(currentUser){

        const newWishlist = [...wishlist]
        newWishlist[i] = !newWishlist[i]
        setWishlist(newWishlist)
    
        if(newWishlist[i] === true){
        dataref.collection("WishlistWeb").doc(currentUser).collection("wishlistDetails").doc(curUserData.id).set(curUserData).then(()=>{
         toast.success("Added to Wishlist")
        })
       }else{
    
        const docRef = dataref.collection("WishlistWeb").doc(currentUser);
        docRef.collection("wishlistDetails").doc(curUserData.id).delete()
        .then(() => {
           toast.success("Item Deleted From Wishlist")
        }).catch((error) => {
    
           console.error('Error Deleting Document',  error)
        })
       }
      }else{
  
       navigate('/login')
      }
    }

    useEffect(() => {

      if (searchInput) {
        // Your search logic here...
        setFirebaseData(location.state.newData);
      }
       

    }, [location, searchInput])

    console.log("search data", firebaseData)
    return (
    <div>
                <Toaster  toastOptions={{duration: 2000}}/>

        <div className='w-[100%] pt-[80px] caret-transparent mb-[100px]'>
          <div className='max-w-[970px] mx-auto text-black text-center'>
          <div className='pb-10'><h1 className='text-xl font-bold'>Search Results For "{searchInput.toUpperCase()}" Here</h1></div>
          <div>
          <div className='grid lg:grid-cols-2 md:grid-cols-2 pb-5 gap-6 text-center'>
       
       {

        firebaseData && firebaseData.map((curElm, i) => {

       return (

      <div className='border-2 shadow-lg rounded' key={i}>
       <div className="slide-container">
       
        <Slide autoplay={false} canSwipe={true} easing='ease'>
         {curElm.imageurl.map((slideImage, index)=> (
            <div key={index}>
              <div  style={{...divStyle, 'backgroundImage': `url(${slideImage})`, objectFit: 'cover' }}>
              </div>
            </div>
          ))} 
        </Slide>

       </div>

         <div className='text-left p-2'>
            <h1 className='text-2xl font-semibold'>{curElm.title}</h1>
            <h2 className='text-xl font-semibold'>Rent ₹ {curElm.rent}</h2>
         </div>

         <div className='pb-2 pr-2'>
          
          <div className='flex items-center	text-xl relative'>
            <GrLocationPin />
            <p className=''>{curElm.location}</p>

            <div className='absolute right-0 bottom-1 flex cursor-pointer'>
            <button className='bg-red-500 text-white font-semibold py-1 px-4 rounded' onClick={() => {

                            currentUser ? navigate('/roomsdetails', {state : {curElm}}) : navigate("/login")
                }}>More</button>
            <i className='text-4xl' onClick={(e)=> AddWishlist(curElm, i,e)}>
           { wishlist[i] && currentUser ? <AiFillHeart /> : <AiOutlineHeart /> }
           </i>
          </div>
        </div> 
        </div>

      </div>

        ) })

       }

       </div>

        {
            (() => {

              if(firebaseData.length === 0 ){

                  return (
                    <div className='flex flex-col items-center justify-center text-center'>
               <img src={search} className='w-[150px]' alt="" />
               <h1 className='font-semibold text-xl'>No Result Found</h1>
               <p className='text-gray-600 text-[13px]'>Search with city name or locality wise</p>
             </div> 
                  )
              }
            }) ()
        }
       </div>
      </div>
    </div>
    </div>
  )
}

export default SearchRooms

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '300px',
   }