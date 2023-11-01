import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import ListRooms2 from './ListRooms2'
import { FormatAlignCenter, FormatAlignJustify,
    FormatAlignLeft } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';




function ListRooms1({setFormData, radioBtnData}) {

    const data = [

        {
            id: 0,
            heading: "Type*",
            h1: "type",
            b1: "Apartment",
            b2: "Entire House",
            b3: "Room"
        },
        {
            id: 1,
            heading: "Bedrooms/Rooms*",
            h1: "rooms",
            b1: "1",
            b2: "2",
            b3: "3",
            b4: "4"
        },
        {
            id: 2,
            heading: "Bathrooms*",
            h1: "bathrooms",
            b1: "1",
            b2: "2",
            b3: "3"
        },
        {
            id: 3,
            heading: "Kitchen*",
            h1: "kitchen",
            b1: "0",
            b2: "1",
            b3: "2",
            b4: "3"
        },
        {
            id: 4,
            heading: "Prefered Tenants*",
            h1: "tenants",
            b1: "Bachelor",
            b2: "Family",
            b3: "Anyone"
        },
        {
            id: 5,
            heading: "Parking*",
            h1: "parking",
            b1: "Bike",
            b2: "Car",
            b3: "Car & Bike",
            b4: "No Parking",
        },
        {
            id: 6,
            heading: "Balcony*",
            h1: "balcony",
            b1: "Yes",
            b2: "No"
        },
    ]

    const [newdata, setNewData] = useState(data);
    const [form, setForm] = useState([]);

    const { pathname } = useLocation();


    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
    
    
    function getValue(e){
        const name = e.target.name;
        const val = e.target.value;
        setFormData((prev)=> {return {...prev, [name] : val} })
        setForm((prev)=> {return {...prev, [name] : val} })
        // radioBtnData((prev)=> {return {...prev, [name] : val} })
        
    }

      useEffect(() => {

        const handleBtn = () => {
            // Check if all radio buttons are selected
            const allButtonsSelected = newdata.every((curElm) =>
              form.hasOwnProperty(curElm.h1)
            );
        
            if (allButtonsSelected) {
                console.log("ok done")
              return true
            } else {
                console.log("naaahhhhh")

              return false

            }
    
          }; 
          handleBtn()
        radioBtnData(handleBtn)
      }, [form, newdata, radioBtnData])

  return (
   <>
       <div className="max-w-[600px] min-w-[300px] mx-auto p-10">

       <div className='pb-5'>
          <h1 className='lg:text-2xl text-[20px] font-semibold'>Welcome to Backsoon Room Listing</h1>
          <h1 className='lg:text-xl text-[15px] font-bold'>Want to Rent Out Your Rooms ?</h1>
          <h1 className='lg:text-xl font-bold text-red-500'>Just List your rooms with us For FREE</h1>
       </div>

     {
        newdata.map((curElm, index)=>{ 
           return <div key={curElm.id}>

           <div className='py-2' key={curElm.id}><h2>{curElm.heading}</h2></div>

           <div className="rounded-md shadow-sm buttons" role="group" onClick={getValue}>
               <div>
                  <input className='' label={curElm.b1} type="radio" name={curElm.h1} value={curElm.b1} />
                  <input label={curElm.b2} type="radio" name={curElm.h1} value={curElm.b2} />
                  {curElm.b3 ? <input label={curElm.b3} type="radio" name={curElm.h1} value={curElm.b3} /> : null}
                  {curElm.b4? <input label={curElm.b4} type="radio" name={curElm.h1} value={curElm.b4} /> : null}
               </div>             
            </div> 
            
        </div>

       })
      }
    </div>
   </>  
   )
}

export default ListRooms1
