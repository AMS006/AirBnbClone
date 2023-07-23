import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PhotoProvider } from 'react-photo-view';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BsTrashFill } from 'react-icons/bs'
import Perks from '../components/Perks'
import HomeLayout from '../layouts/HomeLayout'
import { addNewPlace, getPlaceById, updatePlace } from '../redux/actions/place';
import Image from '../components/Image';

function AddNewPlacesPage() {
    const { action } = useParams()

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [images, setImages] = useState([]);
    const [activeLink, setActiveLink] = useState('');
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(0);
    const [price, setPrice] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const placeData = useSelector((state) => state.place.activePlace)

    useEffect(() => {
        if (action !== "new") {
            dispatch(getPlaceById(action))
        }
    }, [action, dispatch])
    useEffect(() => {
        if (action !== "new" && placeData) {
            setTitle(placeData.title)
            setAddress(placeData.address)
            setPrice(placeData.price)
            setMaxGuests(placeData.maxGuests)
            setCheckIn(placeData.checkIn)
            setCheckOut(placeData.checkOut)
            setDescription(placeData.description)
            setImages(placeData.images)
            setPerks(placeData.perks)
        }
    }, [placeData, action])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (images.length < 2) {
            return window.alert("Minimum 2 images are required")
        }
        const data = {
            id: action, title, address, images, description, perks, checkIn, checkOut, maxGuests, price
        }
        if (action === "new")
            dispatch(addNewPlace(data));
        else
            dispatch(updatePlace(data));
        setTitle('')
        setAddress('')
        setPerks([])
        setDescription('')
        setCheckIn('')
        setCheckOut('')
        setMaxGuests('')
        setPrice("")
        setImages([])
        navigate('/account/accomadation')
    }
    const handleAddImageLink = async (e) => {
        e.preventDefault()
        if (activeLink !== "")
            setImages((prev) => [...prev, activeLink])
        setActiveLink("")
    }
    const handleUploadImage = async (files) => {
        const form = new FormData();
        for (let i = 0; i < files.length; i++) {
            form.append('files', files[i]);
        }
        const { data } = await axios.post('https://shy-lime-bull-tux.cyclic.app/api/v1/place/upload', form)

        const images = data.images
        setImages((prev) => [...prev, ...images])
    }
    const handleImageDelete = (photo, ev) => {
        ev.preventDefault()
        setImages(images.filter((image) => image !== photo))
    }
    const handlePosition = (photo, e) => {
        e.preventDefault()
        setImages([photo, ...images.filter((image) => image !== photo)])
    }
    return (
        <div className='mt-4 md:px-6 px-3'>
            <h2 className='font-bold text-2xl text-center'>Add New Accommodation</h2>
            <form className='my-4 flex flex-col gap-3' onSubmit={handleSubmit}>
                <div className='flex flex-col '>
                    <label htmlFor="title" className='font-semibold text-xl'>Title</label>
                    <span className='text-sm text-gray-500'>Title for yout place, should be short and catchy as in advertiement</span>
                    <input type="text" name="" required className='w-full border border-gray-600 rounded-xl px-4 py-2' id="title" placeholder='title, for example: My lovely apt' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='flex flex-col '>
                    <label htmlFor="address" className='font-semibold text-xl'>Address</label>
                    <span className='text-sm text-gray-500'>Address of your place</span>
                    <input type="text" name="" required className='w-full border border-gray-600 rounded-xl px-4 py-2' id="address" placeholder='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className='flex flex-col '>
                    <label htmlFor="photo" className='font-semibold text-xl'>Photos</label>
                    <span className='text-sm text-gray-500'>more = better</span>
                    <div className='flex items-center md:flex-row flex-col gap-2'>
                        <input type={'url'} name="" className='w-full border border-gray-600 rounded-xl px-4 py-2' id="photo" placeholder='Add using a link ...jpg' value={activeLink} onChange={(e) => setActiveLink(e.target.value)} />
                        <button className='border bg-gray-800 font-semibold text-white md:w-32 w-full p-2 rounded' onClick={handleAddImageLink}>Add Image</button>
                    </div>
                </div>
                <div>
                    <div className='flex gap-2 flex-wrap  items-center'>
                        <PhotoProvider>
                            {images?.map((photo, index) => (
                                <div className='h-32 w-32 rounded overflow-hidden relative' key={index}>
                                    <Image src={`${photo}`} />
                                    <button className='absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded' onClick={(ev) => handleImageDelete(photo, ev)}><BsTrashFill /></button>
                                    <button className='absolute bottom-0 left-0 text-yellow-400 text-lg p-1 bg-white rounded' onClick={(e) => handlePosition(photo, e)}>
                                        {photo === images[0] && <AiFillStar />}
                                        {photo !== images[0] && <AiOutlineStar />}
                                    </button>
                                </div>
                            ))}
                        </PhotoProvider>
                        <label htmlFor={'image'} className='flex h-32 cursor-pointer items-center justify-center px-4 font-semibold text-lg border border-gray-500 py-2 gap-2 rounded w-32'><AiOutlineCloudUpload /> Upload <input type="file" name="" id="image" hidden multiple onChange={(e) => handleUploadImage(e.target.files)} /></label>
                    </div>
                </div>
                <div className='flex flex-col '>
                    <label htmlFor="description" className='font-semibold text-xl'>Description</label>
                    <span className='text-sm text-gray-500'>Description of the place</span>
                    <textarea rows={5} name="" required className='w-full border border-gray-600 rounded-xl px-4 py-2' id="description" placeholder='Add description' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='flex flex-col '>
                    <label htmlFor="perks" className='font-semibold text-xl'>Perks</label>
                    <span className='text-sm text-gray-500'>Select all the perks of your places</span>
                    <Perks setPerks={setPerks} perks={perks} />
                </div>
                <div className='flex flex-col '>
                    <h5 className='font-semibold text-xl'>Select Time</h5>
                    <div className='flex items-center gap-3 mt-2'>
                        <div>
                            <label htmlFor="checkIn" className='font-semibold'>CheckIn Time</label>
                            <input type="time" name="" required className='w-full border border-gray-600 rounded-xl px-4 py-2' id="checkIn" placeholder='address' value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="checkOut" className='font-semibold'>CheckOut Time</label>
                            <input type="time" name="" required className='w-full border border-gray-600 rounded-xl px-4 py-2' id="checkOut" placeholder='address' value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="guests" className='font-semibold text-xl'>Max Guests</label>
                    <span className='text-sm text-gray-500'>Enter maximum number of guests allowed</span>
                    <input type="Number" name="" required className='w-full border border-gray-600 rounded-xl px-4 py-2' id="guests" placeholder='Number of guests' value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="price" className='font-semibold text-xl'>Price</label>
                    <span className='text-sm text-gray-500'>Enter the price of place per night</span>
                    <input type="Number" name="" required className='w-full border border-gray-600 rounded-xl px-4 py-2' id="price" placeholder='Price of place' value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <input type="submit" className='w-full mt-2 cursor-pointer bg-red-500 border-2 border-red-500 font-semibold text-white py-2 rounded-full text-xl' value="Save" />
                <button className='w-full mb-2 border-2 border-red-500  font-semibold py-2 rounded-full text-xl' onClick={() => navigate('/account/accomadation')}>Cancel</button>
            </form>
        </div>
    )
}

export default HomeLayout(AddNewPlacesPage)