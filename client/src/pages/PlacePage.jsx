import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ImageGallery from '../components/ImageGallery'
import ImageViewer from '../components/ImageViewer'
import Navbar from '../components/Navbar'
import {differenceInCalendarDays} from 'date-fns'
import { getPlaceById } from '../redux/actions/place'
import { addUserBooking } from '../redux/actions/booking'

function PlacePage() {
    const {id} = useParams()
    const [open,setOpen] = useState(false)
    const [checkIn,setCheckIn] = useState('')
    const [checkOut,setCheckOut] = useState('')
    const [maxGuest,setMaxGuests] = useState(1)
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    // const [price,setPrice] = useState();
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getPlaceById(id))
    },[id])
    const place = useSelector((state) => state.place.activePlace)
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(name,maxGuest,checkIn,checkOut)
        const days = differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
        console.log(days)
        const price = days * place.price
        console.log(price)
        const data = {
            name,
            maxGuest,
            checkIn,
            checkOut,
            phone,
            place:id,
            price: price
        }
        dispatch(addUserBooking(data))
        setName('')
        setMaxGuests(0)
        setCheckIn('')
        setCheckOut('')
        setPhone('')    
    }
    const handleGuests = (val) =>{
        console.log(place.maxGuests)
        if(val < place.maxGuests)
            setMaxGuests(val)
        else
            setMaxGuests(place.maxGuest)
    }
  return (
    <>
        {open && place && <ImageGallery photos={place.images} title={place.title} setOpen={setOpen}/>}
        {place && !open &&
        <>
            <Navbar />
            <div className='md:px-8 px-4 my-4'>
                <h2 className='md:text-2xl text-xl font-semibold'>{place.title}</h2>
                <a className='underline mt-2 text-gray-600 cursor-pointer hover:text-gray-900'>{place.address}</a>
                <div>
                    <ImageViewer photos={place.images} title={place.title} setOpen={setOpen}/>
                </div>
                <div className='flex md:flex-row flex-col gap-3'>
                    <div>
                        <div>
                            <h3 className='font-semibold text-lg'>Description</h3>
                            <p>{place.description}</p>
                        </div>
                        <div className='flex flex-col gap-1 mt-2'>
                            <h5 className='flex items-center font-semibold'>Check-In-Time :&nbsp;<span>{place.checkIn}</span></h5> 
                            <h5 className='flex items-center font-semibold'>Check-Out-Time :&nbsp;<span>{place.checkOut}</span></h5> 
                            <h5 className='flex items-center font-semibold'>Price :&nbsp;<span>{place.price}</span>/night</h5> 
                            <h5 className='flex items-center font-semibold'>Max-Guests :&nbsp;<span>{place.maxGuests}</span></h5> 
                            <h5>
                                <span className='font-semibold'>All Services : </span>
                                {place.perks.map((perk,index) =>(
                                    <span className='capitalize' key={index}>{perk} ,</span>
                                ))}
                            </h5>
                        </div>
                    </div>
                    <div className='py-2 md:px-4 px-1 rounded-2xl border shadow-lg'>
                        <h2 className='font-semibold text-lg text-center py-2 border-b-2'>Book Your Place Now</h2>
                        <form action="" onSubmit={handleSubmit}>
                            <div className='flex mt-3 md:gap-2 gap-1'>
                                <div className='flex flex-col'>
                                    <label htmlFor="checkIn" className='font-semibold'>Check-In</label>
                                    <input type="date" name="" id="" className='px-2 py-2 rounded border border-black' value={checkIn} onChange={(e) => setCheckIn(e.target.value)}/>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="checkOut" className='font-semibold'>Check-Out</label>
                                    <input type="date" name="" id="" className='px-2 py-2 rounded border border-black' value={checkOut} onChange={(e) => setCheckOut(e.target.value)}/>
                                </div>
                            </div>
                            <div className='flex flex-col mt-2'>
                                <label htmlFor="guests" className='font-semibold'>Max Guests</label>
                                <input type="number" name="number" id="guests" placeholder='Max number of guestss' className='px-2 py-2 border border-black rounded' value={maxGuest} onChange={(e) =>handleGuests(e.target.value)}/>
                            </div>
                            <div className='flex flex-col mt-2'>
                                <label htmlFor="name" className='font-semibold'>Name</label>
                                <input type="text" name="text" id="name" placeholder='Enter Your Name' className='px-2 py-2 border border-black rounded' value={name} onChange ={(e) => setName(e.target.value)}/>
                            </div>
                            <div className='flex flex-col mt-2'>
                                <label htmlFor="phone" className='font-semibold'>Phone</label>
                                <input type="tel" name="text" id="phone" placeholder='Enter Your Phone Number' className='px-2 py-2 border border-black rounded' value={phone} onChange ={(e) =>setPhone(e.target.value)}/>
                            </div>
                            <button className='w-full py-2 bg-red-500 text-white font-semibold mt-3 rounded-full'>Book</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
        }
    </>
  )
}

export default PlacePage