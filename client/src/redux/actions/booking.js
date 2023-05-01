import axios from 'axios'
import { bookingAddSuccess, bookingFail, bookingGetSuccess, bookingRequest } from '../reducers/booking'

export const getUserBookings = () => async(dispatch) =>{
    try {
        dispatch(bookingRequest())
        const booking = await axios({
            method:"GET",
            url:'https://shy-lime-bull-tux.cyclic.app/api/v1/booking'
        })
        dispatch(bookingGetSuccess(booking.data))
    } catch (error) {
        dispatch(bookingFail(error))
    }
}
export const addUserBooking = (data) => async(dispatch) =>{
    try {
        dispatch(bookingRequest())
        const booking = await axios({
            method:"POST",
            url:"https://shy-lime-bull-tux.cyclic.app/api/v1/booking",
            data
        })
        dispatch(bookingAddSuccess(booking.data))
    } catch (error) {
        dispatch(bookingFail(error))
    }
}