import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import password from '../Images/password.png'
import {CgSpinner, cgSpinner} from "react-icons/cg"




function OtpComponent() {


   
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [showOtp, setShowOtp] = useState(false)

  const [ph, setPh] = useState("");


  return (

    <div className='max-w-[400px] mx-auto py-[50px]'>

<div>
     <div className='grid grid-cols-1 justify-items-center'>
        <img className='w-[100px]' src={password} alt="" />
        <h2 className='mt-3'>Enter One Time Password Sent to</h2>
        <h1>+91987654321</h1>
     </div>
    
    <div className='grid grid-cols-1 justify-items-center mt-5'>
     <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      separator={<span style={{ width: "58px" }}></span>}
      isInputNum={true}
      shouldAutoFocus={true}
      renderInput={(props) => <input {...props} />}
      inputStyle={{
          border: "1px solid gray",
          borderRadius: "8px",
          width: "44px",
          height: "44px",
          fontSize: "16px",
          color: "#000",
          fontWeight: "600",
          margin: "5px",
          caretColor: "black"
        }}
        focusStyle={{
          border: "1px solid #CFD3DB",
          outline: "none"
        }} 
    />
   
    <h2>Didn't receive the OTP? <span className='text-red-400 font-semibold'>Resend</span></h2>
    </div>

    <div className='bg-red-400 text-white w-full py-2 rounded mt-5 font-semibold flex gap-1 items-center justify-center'>
      
      {loading && <CgSpinner size={20} className='animate-spin mt-1'/>}
       <span>Verify</span>
    </div>

    </div> 
      
    </div>
  )
}

export default OtpComponent
