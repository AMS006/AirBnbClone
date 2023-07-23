import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HiOutlinePaperAirplane } from 'react-icons/hi2'
import { BiSearch } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { FaBars } from 'react-icons/fa'
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
            <div className='relative md:flex hidden items-center  gap-2 border shadow-md shadow-gray-300 rounded-full px-5 py-2'>
                <input type="text" name="search" placeholder='Search By Location' className='focus:outline-none text-base w-72' id="search" />
                <button className=' absolute right-0 rounded-full bg-red-500 text-white p-1.5 font-bold mx-2 flex justify-center items-center'>
                    <BiSearch size={20} />
                </button>
            </div>
            <div className='flex items-center px-4 py-2 border rounded-full gap-2'>
                <span className='text-lg '><FaBars /></span>
                <Link to={`${user ? '/account/profile' : '/login'}`} className='flex items-center gap-1'>
                    <span className='bg-gray-500 text-white rounded-full text-2xl'><CgProfile /></span>
                    {user && <span className='font-semibold'>{user.name}</span>}</Link>
            </div>
        </div>
    )
}

export default Navbar