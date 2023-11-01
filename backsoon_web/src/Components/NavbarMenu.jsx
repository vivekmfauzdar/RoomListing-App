import React, { useEffect, useState } from 'react'
import logo from '../Images/backsoon_logo.png'
import { PiHouseLineLight,PiUserLight } from "react-icons/pi";
import Dropdown from './Dropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import {auth, dataref} from '../firebase'
import { getAuth,signOut } from 'firebase/auth';
import { collectionGroup, startAfter, limit, query,getDocs, orderBy } from 'firebase/firestore';
import { GiHamburgerMenu } from "react-icons/gi";

import { Toaster, toast } from 'react-hot-toast';

function NavbarMenu() {


  const [user, setUser] = useState("");
  const navigation = useNavigate()
  const [searchInput, setSearchInput] = useState("")
  const [lastVisible, setLastVisible] = useState('')
  const [open, setOpen] = useState(false)

  const Links = [

    {name:"List Rooms",link:"/listrooms"},
    {name:"Chats",link:"/chat"},
    {name:"Wishlist",link:"/wishlist"},
    {name:"MyListing",link:"/mylisting"},
    {name:"About Backsoon",link:"/about_backsoon"},
  ]

  useEffect(()=>{

    const auth = getAuth();
    
    let curUser = auth.onAuthStateChanged((user)=> {

      if(user){

        setUser("notNull")
        toast.success("Signed In Successfully!")

      }
      else{
        setUser(null)

      }
    })

  }, [])

  function logout(){

    const auth = getAuth();
    signOut(auth).then(()=>{
    toast.success("Logout Successfully")

    })

}


  const searchFirestore = async () => {
    try {
      let query = dataref.collectionGroup("room_details");
  
      if (lastVisible) {
        query = query.startAfter(lastVisible);
      }
  
      // Add a filter based on the search input
      if (searchInput.trim() !== "") {
        query = query.where("address", "array-contains", searchInput.trim());
        const snapshot = await query.limit(5).get();
        const newData = snapshot.docs.map((doc) => doc.data());      
        navigation(`/rooms_in` , {state : {newData : newData, searchInput : searchInput}})
  
        // setFirebaseData(newData); // Update the state with search results
        if (snapshot.docs.length > 0) {
          setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        } else {
          setLastVisible(null);
        }
      
    }else{

        toast.success("search field empty!!")
      }
  
     
    } catch (error) {
      console.error("Error searching Firestore:", error);
    }
  };


  const navToHome = () => {

    setSearchInput("")
    navigation('/', {state : {searchInput: searchInput}})

  }

    // Listener for browser's popstate event (back button)
    const handlePopstate = () => {
      // Clear the search input when the user goes back
      setSearchInput('');
    };

  useEffect(() => {
    // Add an event listener for the popstate event
    window.addEventListener('popstate', handlePopstate);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);
 
  return (
    <>
       <div className='w-[100%] caret-transparent'>
       <Toaster toastOptions={{duration: 2000}}/>     

        <div className='lg:max-w-full min-w-[400px] max-w-[800px] grid md:grid-cols-3 grid-cols-2 items-center justify-items-center shadow-lg'>

         <div className=''>
           {/* <NavLink to="/"><img onClick={navToHome} className='w-[160px] cursor-pointer' src={logo} alt="" /> */}
           <img onClick={navToHome} className='w-[160px] cursor-pointer' src={logo} alt="" />
            
         </div>
        
         <div className='gap-2 lg:flex hidden'>
                <input className='border-[2px] caret-blue-gray-400 rounded outline-none py-1 pl-2 w-[350px] border-gray-300' placeholder='Search Room by city name, or locality' type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                <button className=' hover:text-red-400 px-2 py-1 font-[400] rounded' onClick={searchFirestore}>Search</button>
         </div>

          {/*Menu for mobile  */}
         {user != null ? <div className='lg:hidden'>
                 <div onClick={()=>setOpen(!open)} className='text-3xl absolute lg:right-5 right-2 top-1 cursor-pointer lg:hidden'>
                     <ion-icon name={open ? 'close':'menu'}></ion-icon>
                 </div>

                <ul className={`lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static bg-white lg:z-auto z-[1] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-[56px] ':'top-[-490px]'}`}>
                   {
                    Links.map((link)=>(
                   <li key={link.name} className='lg:ml-8 text-[1rem] lg:my-0 my-7'>
                  <NavLink to={link.link} onClick={() => setOpen(false)} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</NavLink>
                  </li>
                  
                 ))
                }
                {<li className='lg:ml-8 text-[1rem] lg:my-0 my-7'><NavLink onClick={(e)=> logout()}
                  to="/"
                  className='text-gray-800 hover:text-gray-400 duration-500'
                >
                 LogOut 
                </NavLink></li>
                 }
              </ul>
           </div> :  ( <div className='flex items-center lg:hidden hover:text-red-600'>
          
          <NavLink to='/login'>
          <div className='flex items-center'>

           <PiUserLight />
           <button  className='px-2 py-1 rounded'>        
           Login/SignUp</button>
           </div>

          </NavLink>
          
         </div>) }


        {/* for desktop */}
        {
           user != null ? 
           
          ( <div className="cursor-pointer lg:block hidden">
          
          <div className='lg:flex hidden items-center '>
          
          <NavLink to='/listrooms'>
           <div className='flex items-center hover:text-red-600'>
            <PiHouseLineLight /> 
             <button  className='px-2 py-1 rounded'>List Rooms</button>
            </div> 
          </NavLink>
          
            <Dropdown className='hover:text-red-600'/>

           </div>
           </div> ):         
        
       ( <div className='items-center hidden lg:flex hover:text-red-600'>
          
          <NavLink to='/login'>
          <div className='flex items-center'>

           <PiUserLight />
           <button  className='px-2 py-1 rounded'>        
           Login/SignUp</button>
           </div>

          </NavLink>
          
         </div>)
        }      
        </div>
        </div>

    </>
   
  )
}

export default NavbarMenu
