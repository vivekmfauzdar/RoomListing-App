import React, { useEffect, useState } from 'react'
import ListRooms1 from './ListRoomsComponent/ListRooms1'
import indiaflag from '../Images/indiafla.webp'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import OtpInput from "otp-input-react";
import password from '../Images/password.png'
import {CgSpinner, cgSpinner} from "react-icons/cg"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import { toast, Toaster } from "react-hot-toast";
import SetUserDetails from './SetUserDetails'
import { getAuth } from 'firebase/auth'
import { Auth } from 'firebase/auth'
import { dataref } from '../firebase'
import HomeRooms from './HomeRooms'


function Login() {


  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setshowOTP] = useState(false);
  const [user, setUser] = useState(null)
  const [uid, setUid] = useState("")
  const [data, setData] = useState("")


  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);


  function onCaptchaVerify(){

        if(!window.recaptchaVerifier){

          window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                onSignUp()
            },
            'expired-callback': () => {}
          });
        }
  }


  const onSignUp = ()=> {

      setLoading(true)
      onCaptchaVerify();

      const appVerifier = window.recaptchaVerifier;
      const formatPh = '+' + ph;
      signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false)
          setshowOTP(true)
          toast.success("OTP Sent Successfully!")
         
       }).catch((error) => {
             console.log(error);
             setLoading(false)
       });

    
  }

  const onOTPVerify = ()=> {

    if(otp === ""){

      toast.error("Please Enter OTP")

    }
    else{
     setLoading(true)
     window.confirmationResult.confirm(otp)
      .then(async(res)=>{
        console.log(res)
        setUser(res.user)
        setLoading(false);
      
        // getting the uid of the current user
        const auth  = getAuth();
        const uid = auth.currentUser.uid;
        setUid(uid);


        //Code to Check if user Exist or New
        const userData = auth.currentUser;
        if(userData.metadata.creationTime === userData.metadata.lastSignInTime){
           console.log("user for the first time")
           setData(false)
          }else{
            console.log("user already present")
            setData(true)
          }
      })}

  }
  return (
   
  <section className="max-w-[400px] min-w-[400px] p-5 mx-auto py-[100px] caret-transparent">
  
    <div>
        <Toaster toastOptions={{duration: 4000}}/>
         <div id='recaptcha-container'></div>
       {
            user ? (data ?  navigate("/") : <SetUserDetails />) :  

          <div>
         {showOTP ? 
          <div>
     <div className='grid grid-cols-1 justify-items-center'>
        <img className='w-[100px]' src={password} alt="" />
        <h2 className='mt-3'>Enter One Time Password Sent to</h2>
        <h1>{"+" + ph}</h1>
     </div>
    
    <div className='grid grid-cols-1 justify-items-center mt-5 caret-black'>
    <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                />

              
       <h2>Didn't receive the OTP? <span className='text-red-400 font-semibold pt-4'>Resend</span></h2>

    </div>

    <button
                  onClick={onOTPVerify}
                  className="bg-red-400 w-full flex gap-1 items-center justify-center mt-5 py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>

          </div> :
         ( <div> 
       <div className='pb-3'>
        <h1 className='text-red-400 font-semibold'>Welcome to Backsoon</h1>
        <h1 className='font-semibold'>Login/SignUp to Find Amazing Rooms Near You</h1>
       </div> 

       <div class="relative w-full">
      
        <PhoneInput className="w-full caret-black"
         country={'in'}
         value={ph}
         onlyCountries={['in']}
         placeholder='Enter Phone Number'
         onChange={setPh} />

       </div>

       <div className='pt-5'> 
        <button className='bg-red-400 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded' onClick={onSignUp}>
          {loading && (<CgSpinner  size={20} className='mt-1 animate-spin'/>)}
          <span>Next</span>
        </button>
       </div>

       <div className='pt-5 text-center'>
        <p className='text-[12px]'>By Creating an account you agree to the Backsoon App's <br /> <span className='font-semibold hover:underline cursor-pointer'> Terms & Conditions</span></p>
       </div>
    
          </div>   ) 
         }
          </div> 
       }
       
    </div>

  
  </section>


  )
}

export default Login
