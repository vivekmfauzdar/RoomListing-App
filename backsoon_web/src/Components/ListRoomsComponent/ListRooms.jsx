import React, { useEffect } from 'react'
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import ListRooms1 from './ListRooms1';
import ListRooms2 from './ListRooms2';
import ListRooms3 from './ListRooms3';
import ListRooms4 from './ListRooms4';
import { dataref } from '../../firebase';
import { getAuth } from 'firebase/auth'
import { ConstructionOutlined } from '@mui/icons-material';
import { storage } from '../../firebase'
import {v4, validate} from 'uuid'
import { Toaster, toast } from 'react-hot-toast';
import {ref, uploadBytes, getDownloadURL, listAll, list} from "firebase/storage"

function ListRooms() {


      const [userUid, setUserUid] = useState("")
      const [id,setId] = useState("")
      const [imageToStorage, setImageToStorage] = useState([]);
      const uuid = v4();

      const { pathname } = useLocation();


    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
   

   const data = {

      type : "",
      rooms: "",
      bathrooms: "",
      kitchen: "",
      tenants: "",
      parking: "",
      balcony: "",
      furnishing: "",
      title: "",
      description: "",
      location: "",
      address: [],
      phoneNum: "",
      rent: "",
      negotiable: "",
      uid: "",
      id: "",
      wificheck: "",
      parkingcheck: "",
      elevatorcheck: "",
      accheck: "",
      gymcheck: "",
      prvtbathcheck: "",
      imageurl: [],

     
   }

    const [page, setPage] = useState(0)
    const [formData, setFormData] = useState(data)
    const [listRooms1, setListRooms1] = useState('')
    const [listRooms2, setListRooms2] = useState({})
    const [listRooms3, setListRooms3] = useState('')
    const [listRooms4, setListRooms4] = useState('')
    const FormTitles = ["Add Details Here", "Add Details Here", "Other", "location"];

    function getChildData(childData){

      setFormData(childData)

  }

  function getImages(imageData){

    setImageToStorage(imageData)
  }


  useEffect(()=> {
  // getting the uid of the current user
 const auth = getAuth()

 let curUser = auth.onAuthStateChanged((user)=> {

   if(user){

          setUserUid(user.uid)
          setFormData((prev)=> {

           return {
   
             ...prev, uid: user.uid
           }
         })
   }
   else{
     setUserUid(null)

   }
 })
 }, [userUid])

 useEffect(()=> {

  if(!listRooms2){}
 })

 useEffect(()=> {

  setId(uuid)

  setFormData((prev)=> {

    return {
 
      ...prev, id: uuid
    }
  })

 }, [])

    const PageDisplay = () => {
        if (page === 0) {
          return <ListRooms1 setFormData={getChildData} radioBtnData={setListRooms1} imageurl={formData.imageurl} />;
        } else if (page === 1) {
          return <ListRooms2 setFormData={getChildData}/>;
        } else if(page ===2) {
          return <ListRooms3 setFormData={getChildData} imageStorage={getImages} validation={setListRooms3}/>;
        }else{
          return <ListRooms4 setFormData={getChildData} validation={setListRooms4}/>
        }
      };

      //saving images in storage
      useEffect(()=> {

        // function uploadFile(){

          if(imageToStorage == null) return;
          
            imageToStorage.map((curImg) => {
    
            const imageRef = ref(storage, `images/${curImg.name + v4()}`);
    
             uploadBytes(imageRef, curImg).then((snapshot)=> {
      
               getDownloadURL(snapshot.ref).then((url) => {
    
                // setImageURLs((prev) => [...prev, url])
                setFormData((prev) => { return { ...prev, imageurl : [ ...prev.imageurl, url ]}})
               
               })
            })
    
          })
          
      // }

      }, [imageToStorage])
     
  
return(
   <>

      <Toaster toastOptions={{duration:2000}}/>
      <div className="max-w-[700px] min-w-[400px] mx-auto p-10">
         <div className='max-w-[700px] h-[10px] bg-gray-500 mb-[50px] rounded'>
            <div className='w-[33.3%] h-[100%] bg-black rounded' style={{ width: page === 0 ? "25%" : page === 1 ? "50%" : page === 2 ? "75%" : "100%" }}>
                 
            </div>
         </div>

         <div>
            {PageDisplay()}
         </div>

      <div className='flex gap-2 justify-center '>
        <button className='bg-red-400 rounded px-4 py-2 font-semibold text-white disabled:bg-gray-400' disabled={page===0} onClick={() => {
              setPage((currPage) => currPage - 1);
            }}>Previous</button>
        <button className='bg-red-400 rounded px-4 py-2 font-semibold text-white' onClick={() => {
             
              if(page === FormTitles.length - 1){

               try{
                dataref.collection("Backsoon_Web_Data").doc(userUid).collection("room_details").doc(id).set(formData).then(() => {
                console.log("Document successfully written!");
                alert("form submitted.")

                 });}catch(error)
                 {
                   console.error(error)
                 }

               
              }
              else{
               
                listRooms1 ? setPage((currPage) => currPage + 1)  : toast.error("Select all buttons")
             }
            }}>{ page === FormTitles.length -1 ? "Submit" : "Next"}</button>
      </div>

      </div>


    </>

)
   
  
}

export default ListRooms
