import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'
import HomeLayout from '../layouts/HomeLayout'
import { createUser } from '../redux/actions/user'
import { userRequest } from '../redux/reducers/user'
function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [val, setVal] = useState("Sign Up")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user, error } = useSelector((state) => state.user)
    useEffect(() => {
        if (error.length > 0) {
            toast.error("IInvalid Credentials Or User Already Exists")
            setLoading(false)
            setVal("Sign Up")
            dispatch(userRequest())
        }
    }, [error, dispatch])
    useEffect(() => {
        if (user) {
            navigate('/')
            toast.success("Logged In Successfully")
            setVal("Sign In")
            setLoading(false);
        }
    }, [user, navigate])
    const handleSignUp = async (e) => {
        e.preventDefault();
        setVal("Signing...")
        setLoading(true);
        dispatch(createUser({ name, email, password }));
        setName("")
        setPassword("")
        setEmail("")
    }
    return (
        <div className='flex-grow flex justify-center items-center w-full'>
            <div className='lg:w-2/5 md:w-1/2 w-11/12'>
                <h2 className='font-bold text-3xl mb-4 text-center'>Sign Up</h2>
                <form className='flex flex-col gap-3' onSubmit={handleSignUp}>
                    <input type="text" value={name} disabled={loading} className={`border focus:outline-slate-700 py-2 px-4 w-full rounded-full font-semibold ${loading ? 'opacity-50 ' : ''}`} name="" id="" placeholder='Your Name' onChange={(e) => setName(e.target.value)} />
                    <input type="email" value={email} disabled={loading} className={`border focus:outline-slate-700 py-2 px-4 w-full rounded-full font-semibold ${loading ? 'opacity-50 ' : ''}`} name="" id="" placeholder='Your@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} disabled={loading} className={`border focus:outline-slate-700 py-2 px-4 w-full rounded-full font-semibold ${loading ? 'opacity-50 ' : ''}`} name="" id="" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value={val} disabled={loading} className={`bg-red-500 text-white p-2 rounded-full cursor-pointer font-semibold text-xl ${loading ? 'opacity-50 ' : ''}`} />
                </form>
                <p className='text-center font-semibold text-gray-600 mt-2'>Already have a account? <Link to='/login' className='underline hover:text-gray-800 '>Login here</Link></p>
            </div>
        </div>
    )
}

export default HomeLayout(SignUpPage)