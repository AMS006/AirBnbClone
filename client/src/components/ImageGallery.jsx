import React from 'react'
import {IoClose} from 'react-icons/io5'
function ImageGallery({photos,setOpen,title}) {
  return (
    <div className='h-screen w-full bg-black text-white  py-6'>
        <div className='flex justify-between px-6'>
            <h2 className='text-lg font-semibold'>Photos of {title}</h2>
            <button className='flex items-center gap-1 fixed top-4 right-4 bg-white rounded-2xl text-black font-semibold px-4 py-2' onClick={() => setOpen(false)}><IoClose /> Close photos</button>
        </div>
        <div className='flex flex-col gap-3 justify-center px-6 bg-black items-center my-6'>
            {photos.map((photo) =>(
                <div className='h-full w-full flex justify-center'>
                    <img src={`${photo}`} className='' alt="" />
                </div>
            ))}
        </div>
    </div>
  )
}

export default ImageGallery