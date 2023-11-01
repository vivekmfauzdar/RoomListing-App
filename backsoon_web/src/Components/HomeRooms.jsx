
import React, { useEffect, useState } from 'react'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { GrLocationPin } from "react-icons/gr";
import Slider from './Slider';
import { Zoom, Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { GrPrevious, GrNext } from "react-icons/gr";
import { dataref } from '../firebase';
import {useNavigate} from "react-router-dom"
import { getAuth } from 'firebase/auth'
import { toast, Toaster } from 'react-hot-toast';
import Login from './Login';
import { collectionGroup, collection, where, onSnapshot, startAfter, limit, query,getDocs, orderBy } from 'firebase/firestore';
import ImageSlider from './ImageSlider';


function HomeRooms() {

  const [firebaseData, setFirebaseData] = useState([])
  const [currentUser, setCurrentUser] = useState('')
  const [lastVisible, setLastVisible] = useState(null)
  const [wishlist, setWishlist] = useState(Array(firebaseData.length).fill(false));
  const [wishlistId, setWishlistId] = useState([]);
  const navigate = useNavigate()

  useEffect(()=> {

    FetchData()

  }, [])

  
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

    const divStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundSize: 'cover',
      height: '300px',
     }


   const FetchData = async() => {


    // dataref.collectionGroup("room_details").onSnapshot((snapshot) => {

    //   const updateData = []
    //   snapshot.forEach((doc)=> {
    //     updateData.push(doc.data());
    //   });
    //   setFirebaseData(updateData)
     
    // })

      try{
         
        let query = dataref.collectionGroup("room_details");


        if(lastVisible){
          query = query.startAfter(lastVisible);
        }

        const snapshot = await query.limit(5).get();
        const newData = snapshot.docs.map((doc) => doc.data())
        setFirebaseData((prev) => [...prev, ...newData])

        if(snapshot.docs.length > 0){
          setLastVisible(snapshot.docs[snapshot.docs.length - 1])
        }else{
          setLastVisible(null)
        }

      }catch(error){
      }
      
   }

  
   // Adding Data to Wishlist
   const AddWishlist = (curUserData, i, e) =>{
        
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

   // Load More Data
   const LoadMore = ()=> {

         FetchData()
  }

   // Getting the firebase data
   useEffect(() => {

    if(currentUser){
    const FetchData = ()=> {

       const colRef = dataref.collection("WishlistWeb").doc(currentUser);
       colRef.collection("wishlistDetails").onSnapshot((snapshot) => {
         const aarr =[]
         snapshot.forEach((curData) => {

             aarr.push({
              
               ids: curData.get("id")})

           })
           setWishlistId(aarr)     
       })
   }
   FetchData() ;  

 }}, [currentUser]) 

 console.log(wishlistId)

  return (
    <>

       <Toaster toastOptions={{duration: 2000}}/>
       <Slider />

    <div className='w-[100%] pt-[60px] caret-transparent mb-[100px]'>
      <div className='lg:max-w-[970px] min-w-[400px] max-w-[600px] mx-auto text-black text-center'>
      <div className='pb-5'><h1 className='md:text-3xl text-2xl font-bold'>Rooms For You</h1></div>

     <div className='grid lg:grid-cols-2 grid-cols-1 pb-5 gap-6'>
       
       {

         firebaseData.map((curElm, i) => {

       return (

      <div className='border-2 shadow-lg rounded m-3' key={i}>
       <div className="slide-container">
       
        <Slide  autoplay={false} canSwipe={true} easing='ease'>
         {curElm.imageurl.map((slideImage, index)=> (
            <div key={index}>
              <div  style={{...divStyle, 'backgroundImage': `url(${slideImage})`, objectFit: 'cover' }}>
              </div>
            </div>
          ))} 
        </Slide>

      
       </div>

         <div className='text-left'>
            <h1 className='text-2xl font-semibold'>{curElm.title}</h1>
            <h2 className='text-xl font-semibold'>Rent ₹ {curElm.rent}</h2>
         </div>

         <div className='pb-2 pr-2'>
          
          <div className='flex items-center	text-xl relative'>
            <GrLocationPin />
            <p className=''>{curElm.location}</p>

            <div className='absolute right-0 bottom-1 flex cursor-pointer'>
            <button className='bg-red-500 text-white font-semibold py-1 px-4 rounded' onClick={() => {

                              navigate('/roomsdetails', {state : {curElm}})

                }}>More</button>
            <i className='text-4xl hrt' onClick={(e)=> AddWishlist(curElm, i ,e)}>              
              {wishlist[i] && currentUser ? <AiFillHeart /> : <AiOutlineHeart /> } 
             </i>          
          </div>

        </div>
      </div>

      </div>
                )
          
         })

       }
       </div>
       <button className='bg-transparent border-solid mt-5 border-2 border-black px-2 py-2 rounded hover:bg-black hover:text-white' onClick={LoadMore}>Load More</button>
      </div>

    </div> 
    </>
   
  )
}

export default HomeRooms
