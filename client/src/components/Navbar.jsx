import React from 'react'
import {HiOutlinePaperAirplane} from 'react-icons/hi2'
import {BiSearch} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import {FaBars} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Navbar() {
    const user = useSelector((state) => state.user.user)
    
  return (
    <div className='flex items-center justify-between md:px-6 px-3 py-4 shadow'>
        <Link to='/'>
            <div className='flex items-center gap-1 w-full'>
                <span className='-rotate-90 text-2xl text-red-500 font-semibold'><HiOutlinePaperAirplane /></span>
                <h2 className='font-bold font-serif text-red-500 text-2xl'>airbnb</h2>
            </div>
        </Link>
        <div className='md:flex hidden items-center  gap-2 border shadow-md shadow-gray-300 rounded-full px-6 py-2'>
            <div className='text-sm font-semibold text-slate-800'>Anywhere</div>
            <div className='text-gray-500'>|</div>
            <div className='text-sm font-semibold text-slate-800'>Any week</div>
            <div className='text-gray-500'>|</div>
            <div className='flex items-center gap-3'>
                <p className='text-sm text-gray-600'>Add guests</p>
                <span className='bg-red-500 p-1 rounded-full font-semibold text-white'><BiSearch /></span>
            </div>
        </div>
        <div className='flex items-center px-4 py-2 border rounded-full gap-2'>
            <span className='text-lg '><FaBars/></span>
            <Link to={`${user?'/account/profile':'/login'}`} className='flex items-center gap-1'>
            <span className='bg-gray-500 text-white rounded-full text-2xl'><CgProfile /></span> 
            {user && <span className='font-semibold'>{user.name}</span>}</Link>
        </div>
    </div>
  )
}

export default Navbar