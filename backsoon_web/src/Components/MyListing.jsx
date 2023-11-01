
import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { dataref } from '../firebase'
import { getAuth } from 'firebase/auth'
import { useState,useEffect } from 'react'
import roomlist from '../Images/checklist.png'
import { GrLocationPin } from "react-icons/gr";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function MyListing() {
 
  const [firebaseData, setFirebaseData] = useState([])
  const [currentUser, setCurrentUser] = useState('')

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
    });


    // Getting the firebase data
    useEffect(() => {

      if(currentUser){
     const FetchData = ()=> {

         const colRef = dataref.collection("Backsoon_Web_Data").doc(currentUser);
         colRef.collection("room_details").onSnapshot((snapshot) => {
           const aarr =[]
           snapshot.forEach((curData) => {
 
               aarr.push({
                
                 doc: curData.data()})
             })
             setFirebaseData(aarr)     

         })
     }
     FetchData() ;  

   }
     
   }, [currentUser]) 

   const DeleteData = (item) => {

    const docRef = dataref.collection("Backsoon_Web_Data").doc(currentUser);
    docRef.collection("room_details").doc(item).delete()
    .then(() => {

       toast.success("Item Deleted From Wishlist")
    }).catch((error) => {

     console.error('Error Deleting Document',  error)
    })
  }
   
 
  return (
    <div>
       <div className='w-[100%] pt-[40px] caret-transparent mb-[100px]'>
         <Toaster toastOptions={{duration:2000}}/>
          <div className='lg:max-w-[770px] max-w-[500px] min-w-[400px] mx-auto text-black text-center'>
            <h1  className='font-semibold text-2xl pl-5 text-left mb-[50px]'>My Listings</h1>
           
            {firebaseData.length !== 0 ?
            
            
             firebaseData && firebaseData.map(({doc})=> {

              return (<div className=''>  
                <div className='flex justify-center gap-2 p-5 relative'>
                 <div>
                 <img src={doc?.imageurl} className='lg:max-w-[200px] max-w-[120px]' alt="" />
                 </div>
                <div>
                 <h1 className='font-semibold text-left'>Rent {doc?.rent} /month</h1>
                 <h1 className='text-left'>{doc?.title}</h1>
                 <div className='flex items-center text-left'><GrLocationPin />
                 <p className=''>{doc?.location}</p>
                 </div>
               </div>
              
               <div className='absolute lg:right-5 bottom-0 right-3 flex gap-3'>
                <div className='flex items-center hover:text-red-400 cursor-pointer'><EditIcon /><span>Edit Listing</span></div>
                <div className='flex items-center hover:text-red-400 cursor-pointer' onClick={() => DeleteData(doc.id)}><DeleteIcon/><span>Delete</span></div>
               </div>
             </div>
             <hr className='mt-3 mb-3' style={{ color: '#919191', backgroundColor: '#919191', height: .5, borderColor : '#CACACA'}}/>
             </div>)

             }) : <div className='grid grid-cols-1 justify-items-center'>
               <img src={roomlist} className='w-[150px]' alt="" />
               <h1 className='font-semibold text-xl'>You have not list any room for rent</h1>
               <p className='text-gray-600 text-[13px]'>Go to list rooms section and list room for rent</p>
             </div> 
           }

          </div>
          </div>
    </div>
  )
}

export default MyListing
