import React from 'react'
import { PhotoProvider } from 'react-photo-view'
import Image from './Image'

function ImageViewer({ photos }) {

  return (
    <PhotoProvider>
      {photos.length > 0 && <div className={`grid gap-2  ${photos.length >= 4 ? 'md:grid-cols-[2fr_1fr_1fr] sm:grid-cols-[2fr_1fr]' : `${photos.length >= 2 ? 'sm:grid-cols-[2fr_1fr]' : ''}`}  my-4 relative`}>
        <div className={`h-full w-full cursor-pointer relative`}  >
          <Image src={photos[0]} />
        </div>
        {photos.length >= 2 && <div className={`sm:grid hidden grid-rows-2 gap-2 h-full w-full cursor-pointer`}>
          <div className='h-full w-full cursor-pointer'>
            <Image src={photos[1]} />
          </div>
          {photos.length >= 3 ?
            <div className='h-full w-full cursor-pointer'>
              <Image src={photos[2]} />
            </div> :
            <div className='flex justify-center items-center w-full h-full border rounded text-gray-400'>No Image</div>}
        </div>}
        {photos.length >= 4 && <div className={`md:grid hidden grid-rows-2 gap-2 h-full w-full cursor-pointer`}>
          <div className='h-full w-full cursor-pointer'>
            <Image src={photos[3]} />
          </div>
          {photos.length >= 5 ?
            <div className='h-full w-full cursor-pointer'>
              <Image src={photos[4]} />
            </div> :
            <div className='flex justify-center items-center w-full h-full border rounded text-gray-400'>No Image</div>}
        </div>}
      </div>}
    </PhotoProvider>
  )
}

export default ImageViewer