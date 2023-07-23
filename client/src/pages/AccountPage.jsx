import React, { useEffect } from 'react'
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import HomeLayout from '../layouts/HomeLayout'
import { logoutUser } from '../redux/actions/user';
import UserPlaces from '../components/UserPlaces';
import { getUserPlaces } from '../redux/actions/place';
import Booking from '../components/Booking';

function AccountPage() {
    const { subpage } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { user, loading } = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(getUserPlaces())
    }, [dispatch])
    function createClass(type) {
        let classVal = 'md:px-6 px-2 py-2 rounded-full font-semibold border-2 border-red-500 '
        if (type === subpage) {
            classVal += 'bg-red-500 text-white'
        }
        return classVal;
    }
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logoutUser())
        navigate('/')
    }
    if (loading) {
        return (
            <div className='h-full w-full flex justify-center items-center'>
                <ReactLoading type='spin' color={'blue'} height={67} width={35} />
            </div>
        )
    }
    return (
        <div className=''>
            <div className='flex items-start w-full justify-center mt-4 md:gap-3 gap-1'>
                <Link to={'/account/profile'} className={createClass('profile')}>Profile</Link>
                <Link to={'/account/bookings'} className={createClass('bookings')}> My Bookings</Link>
                <Link to={'/account/accomadation'} className={createClass('accomadation')}>My Accomadations</Link>
            </div>
            {subpage === 'profile' && user && <div>
                <div className='flex justify-end md:px-4 px-2 md:-mt-6 mt-2'>
                    <button className='bg-red-500 font-semibold px-6 py-2 rounded-full text-white' onClick={handleLogout}>Lougout</button>
                </div>
                <div className='flex justify-center flex-col'>
                    <p className='text-center text-xl mt-4 font-semibold'>Name:&nbsp;<span>{user.name}</span></p>
                    <p className='text-center text-xl font-semibold'>Email: &nbsp;<span>{user.email}</span></p>
                </div>
            </div>}
            {subpage === 'bookings' &&
                <div>
                    <Booking />
                </div>
            }
            {subpage === 'accomadation' &&
                <div>
                    <div className='flex justify-end md:px-4 px-2 md:mt-0 mt-2'>
                        <Link to={'/account/accomadation/new'} className='flex gap-1 items-center px-4 bg-red-500 text-white py-2 font-semibold rounded-full'>
                            <AiOutlinePlus />
                            Add Accomadations</Link>
                    </div>
                    <UserPlaces />
                </div>}
        </div>
    )
}

export default HomeLayout(AccountPage)