import React, { useEffect, useState } from 'react'
import { Input, Textarea, Checkbox } from "@material-tailwind/react";
import { useNavigate,useLocation } from 'react-router-dom';


function ListRooms2({setFormData}) {

  const [values, setValue] = useState({

    rent : "",
    title: "",
    description: ""
  });

  const [errors, setError] = useState({

    rent: '',
    title: '',
    description: '',
  })

  const { pathname } = useLocation();


  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

  function getValues(e){

    const name = e.target.name;
    const value = e.target.value;
    setValue((prev)=> {

      return{

        ...prev, [name] : value
      }
    })
    setFormData((prev)=>{
    
    return{...prev, [name]: value}
    
  })

  }


 

  const validateFields = (input)=> {
              
    const errors = {}

    if(!input.rent){
      errors.rent = "Enter rent amount"
    }

    if(!input.title){
      errors.title = "Enter a title"
    }

    if(!input.description){
      errors.description = "Enter some words for your room"
    }

    return errors;

  }
  
 function handleCheck(e){

    const isCheck = e.target.checked;
    const name = e.target.name;
    const checkVal = e.target.value;
   
    if(isCheck){

      setFormData((prev)=>{

       return { ...prev, [name] : checkVal}

      })
    }else{

      setFormData((prev)=>{

        return { ...prev, [name] : ""}
 
       })

    }
   
  }


  return (

    <>
       <div className="max-w-[600px] mx-auto p-10 ">
      
        <div>
          <h2 className=''>Furnishing</h2>
          <div className="buttons rounded-md shadow-sm p" role="group" onClick={getValues}>
          <input label="Furnished" type="radio" name="furnishing" value="Furnished" />
          <input label="Semi-Furnished" type="radio" name="furnishing" value="Semi-Furnished" />
          <input label="Un-Furnished" type="radio" name="furnishing" value="Un-Furnished" />
        </div>
      </div>


      <div className="w-72 py-5">
       <label htmlFor="rent">Expected Rent*</label>
       <input id='rent' type="text" name='rent' value={values.rent} onChange={getValues} placeholder='Expected Rent*' className='w-72 h-10 pl-3 border-black border-[1.5px] rounded' />
       {errors.rent && <div className="text-red-500">Please enter a title</div>}

      </div>
     
      <div className="w-72">

      <label htmlFor="title">Any Title*</label>
      <input id='title' type="text" name='title' value={values.title} onChange={getValues} placeholder='One Line for your property' className='w-72 h-10 pl-3 mb-5 border-black border-[1.5px] rounded' />
      {errors.title && <div className="text-red-500">Please enter a title</div>}

      <label htmlFor="description">Write Something about your rooms*</label>
       <Textarea id='description' name='description' value={values.description} onChange={getValues} type="text" placeholder='Write something about your property' className='w-72 h-10 pl-3 border-black border-[1.5px] rounded' />
       {errors.description && <div className="text-red-500">Please enter a description</div>}

      </div>

      <div className='pt-5'>
        <h2>Do You want to show your phone number*</h2>
        <div className='buttons' role='group' onClick={getValues}>
        <input label="Yes" type="radio" name="phoneNum" value="Yes" />
        <input label="No" type="radio" name="phoneNum" value="No" />
        {errors.phoneNum && <div className="text-red-500">Please select an option</div>}
        </div>

        <Checkbox label="Negotiable" name='negotiable' value="Negotiable" onClick={handleCheck} />

      </div>

      <div className='pt-5'>
        <h2>Facilities</h2>
        <div role='group' onChange={handleCheck}>
        <Checkbox name='wificheck' label="Wi-Fi" value="Wi-Fi" />
        <Checkbox name='parkingcheck' label="Parking" value="Parking" />
        <Checkbox name='elevatorcheck' label="Elevator" value="Elevator"/>
        <Checkbox name='accheck' label="Air-Conditioner" value="Ac"/>
        <Checkbox name='gymcheck' label="Gym" value="Gym"/>
        <Checkbox name='prvtbathcheck' label="Private Bathroom" value="Bathroom" />
        </div>

      </div>

      </div>
 

    </>
   
  )
}

export default ListRooms2
