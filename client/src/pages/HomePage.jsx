import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HomeLayout from '../layouts/HomeLayout'
import { getAllPlaces } from '../redux/actions/place'

function HomePage() {
  const dispatch = useDispatch()
  const places = useSelector((state) => state.place.places);
  useEffect(()=>{
    dispatch(getAllPlaces())
  },[])
  return (
    <div className='mb-4'>
        {places.length >0 && 
        <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-x-4 gap-y-6 md:px-6 px-3 mt-4'>
          {places.map((place,index) => (
            <Link to={`/place/${place._id}`} key={index}>
              <div className='flex aspect-square rounded-xl object-cover oveflow-hidden'>
                <img src={`http://localhost:4000/uploads/${place.images[0]}`} className='overflow-hidden object-cover w-full rounded-xl' alt="" />
              </div>
              <h2 className='font-semibold text-sm mt-2'>{place.address}</h2>
              <h3 className='text-gray-500 text-sm truncate my-1'>{place.title}</h3>
              <p className='text-sm'><span className='font-semibold'>Price : &nbsp;</span>₹{place.price}<span className='font-semibold'>/night</span></p>
            </Link>
          ))}
        </div>}
    </div>
  )
}

export default HomeLayout(HomePage)