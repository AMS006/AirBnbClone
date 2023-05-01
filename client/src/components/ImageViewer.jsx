import React from 'react'
import {GrGallery} from 'react-icons/gr'

function ImageViewer({photos,setOpen}) {

  return (
    <div className='grid gap-2 md:grid-cols-[2fr_1fr_1fr] sm:grid-cols-[2fr_1fr] my-4 relative'>
        <div className='h-full w-full cursor-pointer' onClick={() => setOpen(true)} >
          <img src={`${photos[0]}`} className='object-cover rounded-lg h-full w-full cursor-pointer' alt="" />
        </div>
        <div className='sm:grid hidden grid-rows-2 gap-2 h-full w-full cursor-pointer'>
          <div className='h-full w-full cursor-pointer' onClick={() => setOpen(true)}>
            <img src={`${photos[1]}`} alt="" className='object-cover rounded-lg h-full w-full cursor-pointer' />
          </div>
          <div className='h-ful w-full'>
            <img src={`${photos[2]}`} alt="" className='object-cover rounded-lg h-full w-full cursor-pointer' />
          </div>
        </div>
        <div className='md:grid hidden grid-rows-2 gap-2 h-full w-full cursor-pointer'>
          <div className='h-full w-full cursor-pointer' onClick={() => setOpen(true)}>
            <img src={`${photos[3]}`} alt="" className='object-cover rounded-lg h-full w-full cursor-pointer' />
          </div>
          <div className='h-full w-full cursor-pointer' onClick={() => setOpen(true)}>
            <img src={`${photos[4]}`} alt="" className='object-cover rounded-lg h-full w-full cursor-pointer' />
          </div>
        </div>
        <button className='flex sm:text-base text-sm items-center gap-1 absolute bottom-3 bg-white py-2 px-3 border border-black shadow rounded-xl sm:right-5 right-2 ' onClick={() => setOpen(true)}><GrGallery /> Show all photos</button>
    </div>
  )
}

export default ImageViewer