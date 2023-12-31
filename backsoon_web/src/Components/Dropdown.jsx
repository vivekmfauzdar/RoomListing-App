
import React, {Fragment, useState} from 'react'
import {Menu, Transition} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { NavLink } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import {toast, Toaster} from 'react-hot-toast'
import {dataref} from '../firebase'
import { useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Dropdown(props) {

  const [curUserUid, setCurUserUid] = useState('');
  const [userName, setUserName] = useState('')
  function logout(){

      const auth = getAuth();
      signOut(auth).then(()=>{
         toast.success("Logout Successfully")

      })

  }


  // getting the current user
  useEffect(()=> {
  
    const auth = getAuth()
  
   let curUser = auth.onAuthStateChanged((user)=> {
  
     if(user){
  
        setCurUserUid(user.uid)
        console.log(user.uid)
        
     }
     else{
       setCurUserUid(null)
  
     }
   })
   }, [])


 
    // getting the name of listing owner
    useEffect(() => {

      const GetData = async() => {

        try{
         const useruid = curUserUid;
         console.log(useruid)
         const docRef = dataref.collection("Users").doc(useruid);
        
        
        //  docRef.get().then((doc) => {
   
        //    if(doc.exists){
   
        //      setUserName(doc.data())
        
        //    }else {
        //      // doc.data() will be undefined in this case
        //      console.log("No such document!");
        //    }
        //  }

        docRef.onSnapshot((snapshot) => {
           
          if(snapshot.exists){
          const name = snapshot.data().name;
          setUserName(name)
          }
        })
         
       }catch(error)  {
         console.log("Error getting document:", error);
     };
     
     }

      GetData()
    }, [curUserUid])

  
  return (
    <div>
     
     <Toaster toastOptions={{duration:2000}}/>
     <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center hover:text-red-400 gap-x-1.5 rounded-md bg-white px-3 py-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                   
                   <div className='flex justify-center items-center gap-2'>
                     <h2 className='text-[16px]'>{userName}</h2> 
                     <h2 className="text-xl">&#8801;</h2>
                   </div>
                    

          {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="/chat"
                  className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','block px-4 py-2 text-sm')}>
                  Chat
                </NavLink>
              )}
            </Menu.Item>
           
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="/wishlist"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Wishlist
                </NavLink>
              )}
            </Menu.Item>
          </div>
         
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="/mylisting"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  My Listing
                </NavLink>
              )}
            </Menu.Item>
          
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="/about_backsoon"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm')}
                >
                  About Backsoon
                </NavLink>
              )}
            </Menu.Item>
            
            <Menu.Item>
              {({ active }) => (
                <NavLink onClick={(e)=> logout()}
                  to="/"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm')}
                >
                 LogOut 
                </NavLink>
              )}
            </Menu.Item>
            
          </div> 

        </Menu.Items>
      </Transition>
    </Menu>

      
    </div>
  )
}

export default Dropdown
