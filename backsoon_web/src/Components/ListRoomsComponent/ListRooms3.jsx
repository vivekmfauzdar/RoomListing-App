import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import imagesUpload from "/Users/vivek/Desktop/Backsoon Web/backsoon_web/src/Images/imageUpload.png"
import { storage } from '../../firebase'
import {v4} from 'uuid'
import {ref, uploadBytes, getDownloadURL, listAll, list} from "firebase/storage"
import { AiOutlineCloudUpload } from "react-icons/ai";

function ListRooms3({ setFormData, imageStorage, validation }) {

  const [selectedimages, setSelectedImages] = useState([])
  const [uploadImage, setImageUpload] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  // console.log(uploadImage)

  const { pathname } = useLocation();


  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
 
 
  const handleMultipleImages = (event)=> {

    const selectedFiles = []
    const targetedFiles = event.target.files;
    const targetedFilesObject = [...targetedFiles]
    setImageUpload((prev) => prev.concat(targetedFilesObject));
    imageStorage(targetedFilesObject)

    targetedFilesObject.map((file) => {

       return selectedFiles.push(URL.createObjectURL(file))

    })

    setSelectedImages((prev) => prev.concat(selectedFiles))

  }

  function deleteHandler(image){

     setSelectedImages(selectedimages.filter((e, i) => {return i !== image}));
     setImageUpload(uploadImage.filter((e, i) => i !== image))
     URL.revokeObjectURL(image)

  }

  function handleCheck(){

    if(uploadImage.length === 0){
      return false
    }else{
      return true
    }

  }

  useEffect(()=>{

    validation(handleCheck)
  }, [])

  // function uploadFile(){

  //     if(uploadImage == null) return;
      
  //       uploadImage.map((curImg) => {

  //       const imageRef = ref(storage, `images/${curImg.name + v4()}`);

  //        uploadBytes(imageRef, curImg).then((snapshot)=> {
  
  //          getDownloadURL(snapshot.ref).then((url) => {

  //           setImageURLs((prev) => [...prev, url])
  //           setFormData((prev) => { return { ...prev, imageurl : [ ...prev.imageurl, url ]}})
           
  //          })
  //       })

  //     })
      
  // }

  // console.log(imageURLs)


  return (

    <>
        <div className="max-w-[600px] mx-auto p-5 pb-[160px]">

        <div className='pb-5'>
          <h1 className='text-xl font-semibold text-center'>Upload Your Photos Here</h1>
        </div>

        <div className='grid grid-cols-1 justify-items-center'> 
          {/* <img className='w-[5rem]' src={imagesUpload} alt="" /> */}
          <input type='file' id='file' className='bg-[#6333B5] rounded text-white px-4 py-1 mt-2 w-[0.1px] h-[0.1px] opacity-0 overflow-hidden	absolute z-[-1] input' accept='image/*' onChange={handleMultipleImages} multiple />

          <label htmlFor="file" className=''>Choose Images</label>
          <span className='text-[12px] pt-2'>Add some Picture of Your Rooms to Get Noticed</span>


          
        </div>

  
         {/* <button className='bg-red-400 font-semibold text-white px-3 py-2' onClick={uploadFile}>Upload Images</button> */}
        
         
         <div className='text-center'>
         {
           selectedimages.length > 5 ? (<div> <p className='text-red-500 font-semibold'>You can't not upload more than 5 images</p>
          <span className='text-red-500 font-bold'>Delete any <b>{selectedimages.length - 5}</b> of them{" "}</span> </div>) : " "
         }
         </div>
          


        <div className='grid grid-cols-3 p-10 shadow-lg gap-2 justify-items-center items-center'>
         {
         selectedimages.map((url, i) => {

            return (

                <div className='shadow-lg max-w-[100px] h-full text-center' key={url}>
                 <img src={url} alt='images'/> 
                 <button className='text-red-600 text-[14px] font-semibold ' onClick={() => deleteHandler(i)}>Remove</button>

                </div> 
            )
         })
      }

    </div>

        </div>

    </>
    
  )
}

export default ListRooms3
