import axios from 'axios'
import { userRequest,userSuccess,userFail, logoutSuccess } from '../reducers/user'

export const createUser = (user) => async(dispatch) =>{
    try {
        dispatch(userRequest())

        const userData = await axios({
            method:"POST",
            url:"https://shy-lime-bull-tux.cyclic.app/api/v1/user/createUser",
            data:user
        })
        // dispatch(userSuccess(userData.data.user))
    } catch (error) {
        dispatch(userFail(error.message))
    }
}
export const loginUser = (user) => async(dispatch) =>{
    try {
        dispatch(userRequest())

        const userData = await axios({
            method:"POST",
            url:"https://shy-lime-bull-tux.cyclic.app/api/v1/user/login",
            data:user
        })
        dispatch(userSuccess(userData.data.user))
    } catch (error) {
        dispatch(userFail(error.message))
    }
}
export const logoutUser = (user) => async(dispatch) =>{
    try {
        dispatch(userRequest())

        await axios({
            method:"POST",
            url:"https://shy-lime-bull-tux.cyclic.app/api/v1/user/logout"
        })
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(userFail(error.message))
    }
}
export const getProfile = (user) => async(dispatch) =>{
    try {
        dispatch(userRequest())

        const userData = await axios({
            method:"GET",
            url:"https://shy-lime-bull-tux.cyclic.app/api/v1/user/profile",
        })
        dispatch(userSuccess(userData.data.user))
    } catch (error) {
        dispatch(userFail(error.message))
    }
}