import axios from 'axios';
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HomeLayout from '../layouts/HomeLayout'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/user';
function SignInPage() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate()
    if(user){
        navigate('/')
    }
    const handleLogin = async(e) =>{
        e.preventDefault();
        // await axios.post('http://localhost:4000/api/v1/user/login',{email,password})
        dispatch(loginUser({email,password}))
        setEmail("")
        setPassword("")
    }
  return (
    <div className='flex-grow flex justify-center items-center'>
        <div className='lg:w-2/5 md:w-1/2 w-11/12'>
            <h2 className='font-bold text-3xl mb-4 text-center'>Login</h2>
            <form className='flex flex-col gap-3' onSubmit={handleLogin}>
                <input required type="email" className='border focus:outline-none py-2 px-4 w-full rounded-full font-semibold' name="" id="" placeholder='your@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input required type="password" className='border focus:outline-none py-2 px-4 w-full rounded-full font-semibold' name="" id="" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value="Login" className='bg-red-500 text-white p-2 cursor-pointer rounded-full font-semibold text-xl' />
            </form>
            <p className='text-center font-semibold text-gray-600 mt-2'>Don't have an account yet? <Link to='/signup' className='underline hover:text-gray-800 '>Register now</Link></p>
        </div>
    </div>
  )
}

export default HomeLayout(SignInPage)