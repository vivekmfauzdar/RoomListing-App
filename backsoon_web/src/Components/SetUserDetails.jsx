import React, { useEffect, useState } from 'react'
import ReactRoundedImage from "react-rounded-image"
import UserImage from '../Images/usericon1.png'
import { dataref } from '../firebase'
import validator from 'validator'
import { getAuth } from 'firebase/auth'
import { toast, Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from 'react-router-dom'
import usericon from '../Images/usericon1.png'
import {ref, uploadBytes, getDownloadURL, listAll, list} from "firebase/storage"
import { storage } from '../firebase'
import {v4, validate} from 'uuid'



function SetUserDetails() {
  
     const [input, setInput] = useState({

        name: "",
        email: "",
       
     })

     const [userData, setUserData] = useState("");
     const [formErr, setFormErr] = useState({})
     const [isSubmit, setisSubmit] = useState(false)
     const [isLoading, setIsLoading] = useState(true);
     const [file, setFile] = useState()
     const navigation = useNavigate();

     const auth  = getAuth();
     const uid  = auth.currentUser.uid;
     const phone  = auth.currentUser.phoneNumber;
     console.log(uid)


     function getImage(e){

         setIsLoading(false)
         setFile(URL.createObjectURL(e.target.files[0]))
          
     }

    
     function getInputs(e){

        const name = e.target.name;
        const value = e.target.value;

        setInput((prev)=>{

          return {
  
              ...prev, [name] : e.target.value,
          }
          })
       
     }

     const handleAdd = ()=> {

         setFormErr(validator(input))
         setisSubmit(true)
     
     }

     useEffect(()=>{

        if(Object.keys(formErr).length === 0 && isSubmit){

            if(file !== null){
             console.log(input)

             const imageRef = ref(storage, `profiles/${file.name + v4()}`);
    
             uploadBytes(imageRef, file).then((snapshot)=> {
      
               getDownloadURL(snapshot.ref).then((url) => {
    
                dataref.collection("Users").doc(uid).set({
            
                  name : input.name,
                  email : input.email,
                  phoneNum: phone,
                  profileImage: url,
                  status: "online",
                  uid: uid,
                  profileCompleted: true
    
          
              }).then((docRef)=>{
    
                toast.success("Profile Saved!")
              }).then(()=> {
    
                navigation("/")
    
              })
    
               })
              })
        }else{
          
          dataref.collection("Users").doc(uid).set({
            
            name : input.name,
            email : input.email,
            phoneNum: phone,
            profileImage: "NO Image",
            status: "online",
            uid: uid,
            profileCompleted: true

    
        }).then((docRef)=>{

          toast.success("Profile Saved!")
        }).then(()=> {

          navigation("/")

        })

        }}
     }, [formErr])

     function validator(values){

       const errors = {}
       const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

       if(!values.name){
  
              errors.name = "Name is required!"

       }

       if(!values.email){
  
              errors.email = "Email is required!"
       }else if(!regex.test(values.email)){

           errors.email = "This is not a Valid Email!"
       }

       return errors;
     }
  
    return (
        <div className='max-w-[500px] mx-auto pb-6'>

        <Toaster toastOptions={{duration: 2000}}/>

        <div>
          
          <div className='flex flex-col items-center mb-3'>
            {/* <img type="file" src={usericon} className='w-[120px] h-[120px] rounded-full' style={{ display: isLoading ? "block" : "none" }} alt='profile_image' /> */}
            <img alt="ad-img" type="file" className='w-[120px] h-[120px] rounded-full' src={file} />
            <input type="file" onChange={getImage} />
            <p>Upload Photo</p>
            <p>Please add photo and fill other details</p>
          </div>
         
          <div class="relative mb-3">
           <input
            type="text" name='name'
            className="peer m-0 block h-[58px] w-full rounded border border-solid border-gray-400 bg-gray-100 bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear  placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
            id="inputName" value={input.name} onChange={getInputs}
            placeholder="Enter Name" />
            <span className='text-red-500'>{formErr.name} </span>
           <label
            for="inputName"
            className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
           >Enter Name</label>

         
         </div>
  
  
         <div class="relative mb-6">
           <input
            type="email" name='email'
            className="peer m-0 block h-[58px] w-full rounded border border-solid border-gray-400 bg-gray-100 bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
            id="inputName" onChange={getInputs} value={input.email}
            placeholder="Enter Email here" />
            <span className='text-red-500'>{formErr.email} </span>
           <label
            for="inputName"
            className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
           >Enter Email</label>
         
         </div>
  
         <button className='bg-red-400 text-white rounded w-full py-2' onClick={handleAdd}>Save</button>
        </div>
        </div>
  )


}

export default SetUserDetails
