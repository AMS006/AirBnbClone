import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Skeleton from './Skeleton';

const PlaceBox = ({ place }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Link to={`/place/${place._id}`} >
        <div className='flex aspect-square rounded-xl object-cover oveflow-hidden relative'>
          {loading && <Skeleton />}
          <img src={`${place.images[0]}`} onLoad={() => setLoading(false)} className={`overflow-hidden object-cover w-full rounded-xl ${loading ? 'hidden' : 'block'}`} alt="" />
          {place.status === 'Booked' && <div className='absolute bg-red-500 p-1  text-white text-sm font-semibold top-0 right-0 z-20'>Not Available</div>}
        </div>
        <h2 className='font-semibold text-sm mt-2'>{place.address}</h2>
        <h3 className='text-gray-500 text-sm truncate my-1'>{place.title}</h3>
        <p className='text-sm'><span className='font-semibold'>Price : &nbsp;</span>₹{place.price}<span className='font-semibold'>/night</span></p>
      </Link>
    </>
  )
}

export default PlaceBox