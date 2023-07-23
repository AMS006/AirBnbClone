import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactLoading from 'react-loading';
import { BiSearch } from 'react-icons/bi';
import HomeLayout from '../layouts/HomeLayout'
import { getAllPlaces } from '../redux/actions/place'
import PlaceBox from '../components/PlaceBox'

function HomePage() {
  const dispatch = useDispatch()
  const { places, loading } = useSelector((state) => state.place);

  useEffect(() => {
    dispatch(getAllPlaces())
  }, [dispatch])
  if (loading) {
    return (
      <div className='h-full w-full flex justify-center items-center'>
        <ReactLoading type='spin' color={'blue'} height={67} width={35} />
      </div>
    )
  }
  return (
    <div className='py-6 px-2'>
      <div className='relative md:hidden flex items-center  gap-2 border shadow-md shadow-gray-300 rounded-full px-5 py-2 w-full'>
        <input type="text" name="search" placeholder='Search By Location' className='focus:outline-none text-base w-11/12' id="search" />
        <button className=' absolute right-0 rounded-full bg-red-500 text-white p-1.5 font-bold mx-2 flex justify-center items-center'>
          <BiSearch size={20} />
        </button>
      </div>
      <h1 className='py-3 px-6 text-2xl font-semibold'>All Accomadations</h1>
      {places.length > 0 &&
        <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-x-4 gap-y-6 md:px-6 px-3 mt-4'>
          {places.map((place, index) => (
            <PlaceBox place={place} key={index} />
          ))}
        </div>}
    </div>
  )
}

export default HomeLayout(HomePage)