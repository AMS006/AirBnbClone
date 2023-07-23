import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import HomeLayout from '../layouts/HomeLayout'
import { loginUser } from '../redux/actions/user';
import { userRequest } from '../redux/reducers/user';

function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [val, setVal] = useState("Sign In")

    const dispatch = useDispatch()
    const { user, error } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (error.length > 0) {
            toast.error("Invalid Credentials")
            setLoading(false)
            setVal("Sign In")
            dispatch(userRequest())
        }
    }, [error, dispatch])
    useEffect(() => {
        if (user) {
            navigate('/')
            toast.success("Logged In Successfully")
            setVal("Sign In")
        }
    }, [user, navigate])
    const handleLogin = async (e) => {
        e.preventDefault();
        setVal("Signing..")
        setLoading(true)
        dispatch(loginUser({ email, password }))
        setEmail("")
        setPassword("")
    }
    return (
        <div className='flex-grow flex justify-center items-center'>
            <div className='lg:w-2/5 md:w-1/2 w-11/12'>
                <h2 className='font-bold text-3xl mb-4 text-center'>Login</h2>
                <form className='flex flex-col gap-3' onSubmit={handleLogin}>
                    <input required type="email" disabled={loading} className={`border focus:outline-none py-2 px-4 w-full rounded-full font-semibold ${loading ? 'opacity-50 ' : ''}`} name="" id="" placeholder='your@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input required type="password" disabled={loading} className={`border focus:outline-none py-2 px-4 w-full rounded-full font-semibold ${loading ? 'opacity-50 ' : ''}`} name="" id="" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value={val} disabled={loading} className={`bg-red-500 text-white p-2 cursor-pointer rounded-full font-semibold text-xl ${loading ? 'opacity-50 ' : ''}`} />
                </form>
                <p className='text-center font-semibold text-gray-600 mt-2'>Don't have an account yet? <Link to='/signup' className='underline hover:text-gray-800 '>Register now</Link></p>
            </div>
        </div>
    )
}

export default HomeLayout(SignInPage)