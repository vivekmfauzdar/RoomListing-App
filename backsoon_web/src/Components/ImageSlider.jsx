import React from 'react'
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


const indicators = (index) => (<div className="indicator">{index + 1}</div>);

function ImageSlider() {

    const slides = [

        {
            imageUrl: "/q1.png"
            
        },
        {
            imageUrl: "/q2.png"
        }
       
       
    ]
  return (
    <div>
      <div className='max-w-[970px]  m-auto mt-5'>
      <Zoom indicators={indicators}  scale={1.4}>
      {slides.map((slideImage, index)=> (
            <div key={index}>
              <div  style={{...divStyle, 'backgroundImage': `url(${slideImage.imageUrl})`, objectFit: 'contain' }}>
              </div>
            </div>
          ))} 
        </Zoom>
      </div>
    </div>
  )
}

export default ImageSlider

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '300px',
   }