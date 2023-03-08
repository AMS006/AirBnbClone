import React from 'react'
import Navbar from '../components/Navbar'

const HomeLayout = (Components) => ({...props}) =>{
  return (
    <div className='flex flex-col h-screen'>
        <Navbar />
        <Components {...props} />
    </div>
  )
}

export default HomeLayout