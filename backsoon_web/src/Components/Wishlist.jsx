import React, { useEffect, useState } from 'react'
import MyPhoto from '../Images/box7_image.jpg'
import SetUserDetails from './SetUserDetails'
import wishlist from '../Icons/wishlist (1).png'
import office from '../Images/office.jpg'
import { MdDelete } from "react-icons/md";
import { GrLocationPin } from "react-icons/gr";
import { dataref } from '../firebase'
import { getAuth } from 'firebase/auth'
import { useLocation } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { toast, Toaster } from "react-hot-toast";




function Wishlist() {


    const [firebaseData, setFirebaseData] = useState([])
    const [currentUser, setCurrentUser] = useState('')

    const { pathname } = useLocation();


    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

    //Getting the current user
    useEffect(()=> {

      const auth = getAuth()
      const curUser = auth.onAuthStateChanged((user) => {

        if(user){

          setCurrentUser(user.uid)
        }else{

          setCurrentUser(null)
        }
      })
    })


    // Getting the firebase data
    useEffect(() => {

       if(currentUser){
       const FetchData = ()=> {

          const colRef = dataref.collection("WishlistWeb").doc(currentUser);
          colRef.collection("wishlistDetails").onSnapshot((snapshot) => {
            const aarr =[]
            snapshot.forEach((curData) => {
  
                aarr.push({
                 
                  curElm: curData.data()})
              })
              setFirebaseData(aarr)     

          })
      }
      FetchData() ;  

    }
      
    }, [currentUser]) 

    const handleDelete = (items)=> {

       const docRef = dataref.collection("WishlistWeb").doc(currentUser);
       docRef.collection("wishlistDetails").doc(items).delete()
       .then(() => {

          toast.success("Item Deleted From Wishlist")
       }).catch((error) => {

        console.error('Error Deleting Document',  error)
       })

    }

      return (
      <>
        <div className='w-[100%] pt-[40px] caret-transparent mb-[100px]'>
         <Toaster toastOptions={{duration:2000}}/>
          <div className='lg:max-w-[770px] max-w-[500px] min-w-[400px] mx-auto text-black text-center'>
           
         <h1 className='font-semibold text-2xl pl-5 text-left mb-[50px]'>Wishlist</h1>
          <div>
           {firebaseData.length !== 0 ?
          
            firebaseData.map(({curElm}, i) => {

              return(

             <div className=''>  
                <div className='flex items-center justify-center gap-2 relative'>
                 <div>
                 <img src={curElm?.imageurl} className='lg:max-w-[200px] max-w-[150px]' alt="" />
                 </div>
               <div>
                 <h1 className='font-semibold text-left'>Rent {curElm?.rent} /month</h1>
                 <h1 className='text-left'>{curElm?.title}</h1>
                 <div className='flex items-center text-left '><GrLocationPin />
                <p className=''>{curElm?.location}</p></div>
               </div>
               <div className='absolute right-2 lg:top-1 top-4' onClick={()=> handleDelete(curElm.id)}><MdDelete className='hover:text-red-400 cursor-pointer' size={30} /></div>
             </div>
             <hr className='mt-3 mb-3' style={{ color: '#919191', backgroundColor: '#919191', height: .5, borderColor : '#CACACA'}}/>
             </div>
              )
             }) :  <div className='grid grid-cols-1 justify-items-center'>
               <img src={wishlist} className='max-w-[120px]' alt="" />
               <h1 className='font-semibold text-xl'>Add Rooms to Wishlist</h1>
               <p className='text-gray-600 text-[13px]'>Add Favorite rooms to wishlist by clicking the heart icon on the rooms</p>
             </div> }
             </div> 
          
          </div>
         </div> 
      </>

  )
}

export default Wishlist
