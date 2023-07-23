import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { differenceInCalendarDays } from 'date-fns'
import ImageViewer from '../components/ImageViewer'
import { getPlaceById } from '../redux/actions/place'
import { addUserBooking } from '../redux/actions/booking'
import HomeLayout from '../layouts/HomeLayout'
import { toast } from 'react-hot-toast';
import { clearNewBooking } from '../redux/reducers/booking';

function PlacePage() {
    const { id } = useParams()
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuest, setMaxGuests] = useState(1)
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const dispatch = useDispatch();
    const [bookingLoading,setLoading] = useState(false);

    const {newBooking} = useSelector((state) => state.booking)
    const {user} = useSelector((state) => state.user)
    
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getPlaceById(id))
    }, [id, dispatch])

    useEffect(() =>{
        if(newBooking){
            setLoading(false)
            toast.success("Booking Placed Successfully")
            navigate("/account/bookings");
            dispatch(clearNewBooking())
        }
    },[newBooking,dispatch,navigate])

    const { activePlace, loading } = useSelector((state) => state.place)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!user){
            toast.error("Login to book the place")
            navigate('/login')
        }
        setLoading(true);
        const days = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
        if(days <= 0){
            setLoading(false);
            return toast.error("CheckOut Date Should be After Check-In date")
        }
        const price = days * activePlace.price
        
        const data = {
            name,
            maxGuest,
            checkIn,
            checkOut,
            phone,
            place: id,
            price: price
        }
        dispatch(addUserBooking(data))
        setName('')
        setMaxGuests(0)
        setCheckIn('')
        setCheckOut('')
        setPhone('')
    }
    const handleGuests = (val) => {
        if (val < activePlace.maxGuests)
            setMaxGuests(val)
        else
            setMaxGuests(activePlace.maxGuest)
    }
    if (loading) {
        return (
            <div className='h-full w-full flex justify-center items-center'>
                <ReactLoading type='spin' color={'blue'} height={67} width={35} />
            </div>
        )
    }
    return (
        <>
            {activePlace &&
                <>
                    <div className='md:px-8 px-4 py-6'>
                        <h2 className='md:text-2xl text-xl font-semibold'>{activePlace.title}</h2>
                        <span className='underline mt-2 text-gray-600 cursor-pointer hover:text-gray-900'>{activePlace.address}</span>
                        <div>
                            <ImageViewer photos={activePlace.images} />
                        </div>
                        <div className='flex md:flex-row flex-col gap-3'>
                            <div>
                                <div>
                                    <h3 className='font-semibold text-lg'>Description</h3>
                                    <p>{activePlace.description}</p>
                                </div>
                                <div className='flex flex-col gap-1 mt-2'>
                                    <h5 className='flex items-center font-semibold'>Check-In-Time :&nbsp;<span>{activePlace.checkIn}</span></h5>
                                    <h5 className='flex items-center font-semibold'>Check-Out-Time :&nbsp;<span>{activePlace.checkOut}</span></h5>
                                    <h5 className='flex items-center font-semibold'>Price :&nbsp;<span>{activePlace.price}</span>/night</h5>
                                    <h5 className='flex items-center font-semibold'>Max-Guests :&nbsp;<span>{activePlace.maxGuests}</span></h5>
                                    <h5>
                                        <span className='font-semibold'>All Services : </span>
                                        {activePlace.perks.map((perk, index) => (
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
                                            <input type="date" name="" id="checkIn" required className='px-2 py-2 rounded border border-black' value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label htmlFor="checkOut" className='font-semibold'>Check-Out</label>
                                            <input type="date" name="" id="checkOut" required className='px-2 py-2 rounded border border-black' value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label htmlFor="guests" className='font-semibold'>Max Guests</label>
                                        <input type="number" name="number" id="guests" required placeholder='Max number of guestss' className='px-2 py-2 border border-black rounded' value={maxGuest} onChange={(e) => handleGuests(e.target.value)} />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label htmlFor="name" className='font-semibold'>Name</label>
                                        <input type="text" name="text" id="name" required placeholder='Enter Your Name' className='px-2 py-2 border border-black rounded' value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label htmlFor="phone" className='font-semibold'>Phone</label>
                                        <input type="tel" name="text" id="phone" required placeholder='Enter Your Phone Number' className='px-2 py-2 border border-black rounded' value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <input type='submit' value={`${activePlace.status === 'Booked'?'Not Available':`${bookingLoading?'Booking...':'Book'}`}`} className={`w-full py-2 bg-red-500 text-white font-semibold mt-3 rounded-full ${bookingLoading?'bg-opacity-50 cursor-default':''}  ${activePlace.status === 'Booked'?'cursor-default bg-opacity-50':'cursor-pointer'}`} />
                                </form>
                                <p className='py-1.5 text-sm text-red-600 text-center'><b>*Note</b>: Once Booked It cannot be cancelled</p>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default HomeLayout(PlacePage)