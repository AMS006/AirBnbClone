import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserBookings } from '../redux/actions/booking'
import {AiOutlineArrowRight} from 'react-icons/ai'
import {BsCalendarDate} from 'react-icons/bs'
import {differenceInCalendarDays} from 'date-fns'
import ReactLoading from 'react-loading';

function Booking() {
    const dispatch = useDispatch()
    const {userBookings,loading} = useSelector((state) => state.booking)

    useEffect(() =>{
        dispatch(getUserBookings())
    },[dispatch])
    if(loading){
        return(
          <div className='h-full w-full flex justify-center py-6 items-center'>
            <ReactLoading type='spin' color={'blue'} height={67} width={35} />
          </div>
        )
      }
    if(userBookings?.length <= 0)
        return(
            <div className='flex justify-center mt-8 text-gray-500 font-semibold'>
                <span>No Booking found</span>
            </div>
        )
  return (
    <div className='mt-4'>
        {userBookings?.length > 0 && <div className='flex flex-col gap-4 px-4'>
            {userBookings.map((booking) => (
                <div className='sm:flex gap-4 bg-gray-200'>
                    <div className='sm:w-48 sm:h-36 h-44 rounded-lg p-1'>
                        <img src={`${booking.place.images[0]}`} className='w-full h-full overflow-hidden rounded-lg object-cover' alt="" />
                    </div>
                    <div>
                        <h2 className='font-semibold text-lg'>{booking.place.title}</h2>
                        <div className='flex items-center gap-3'>
                            <span className='flex items-center gap-1'><BsCalendarDate />{booking.checkIn} </span>
                            <span><AiOutlineArrowRight /></span>
                            <span className='flex items-center gap-1'><BsCalendarDate />{booking.checkOut}</span>
                        </div>
                        <h4 className='font-semibold text-lg'>{differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))} nights</h4>
                        <h4><span className='font-semibold text-lg'>Total-Price :&nbsp;</span>₹{booking.price}</h4>
                    </div>
                </div>
            ))}
        </div> }
    </div>
  )
}

export default Booking