import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading';
function UserPlaces() {
    const {userPlaces,loading} = useSelector((state) => state.place)
    if(loading){
        return(
          <div className='h-full w-full py-6 flex justify-center items-center'>
            <ReactLoading type='spin' color={'blue'} height={67} width={35} />
          </div>
        )
      }
    if(userPlaces.length <= 0)
        return(
            <div className='flex justify-center text-gray-500 font-semibold'>
                <span>No Accomadations found</span>
            </div>
        )
  return (
    <div className='md:px-4 px-2 flex flex-col gap-3 my-4 '>
        {userPlaces.length>0 && userPlaces.map((place,index) =>(
            <Link to={`/account/accomadation/${place._id}`} key={index} className='bg-gray-200 shadow px-2 py-2 flex md:flex-row flex-col gap-3 rounded'>
                <div className='md:h-32 md:w-36 flex rounded overflow-hidden'>
                    <img src={`${place.images[0]}`} alt={`${place.images[0]}`} className="h-full w-full object-cover" />
                </div>
                <div className='flex flex-col gap-1'>
                    <h2 className='md:text-xl text-lg font-semibold'>{place.title}</h2>
                    <p className='mt-1 text-gray-600 font-semibold text-sm'>{place.address}</p>
                    <div className='flex items-center '>
                        <span className='font-semibold'>Price : </span>
                        <span>&nbsp;₹{place.price}/night</span>
                    </div>
                    <div className='flex text-sm gap-2'>
                        <div>
                            <span className='font-semibold'>CheckIn-Time : &nbsp;</span>
                            <span>{place.checkIn}</span>
                        </div>
                        <div>
                            <span className='font-semibold'>CheckOut-Time : &nbsp;</span>
                            <span>{place.checkOut}</span>
                        </div>
                    </div>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default UserPlaces