import React from 'react'
import { useState } from 'react'
import { PhotoView } from 'react-photo-view'
import Skeleton from './Skeleton'

const Image = ({ src }) => {
  const [loading, setLoading] = useState(true)
  return (
    <>
      <div className='flex aspect-square object-cover'>
        {loading && <Skeleton />}
        <PhotoView src={src}>
          <img src={src} onLoad={() => setLoading(false)} className={`object-cover rounded-lg h-full w-full ${loading ? 'hidden' : 'block'} cursor-pointer`} alt="" />
        </PhotoView>
      </div>
    </>
  )
}

export default Image