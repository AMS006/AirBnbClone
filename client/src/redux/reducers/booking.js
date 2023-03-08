import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userBookings:[],
    error:"",
    loading:false
}
const bookingSlice = createSlice({
    name:"booking",
    initialState,
    reducers:{
        bookingRequest:(state) =>{
            state.loading = true
            state.error = ''
        },
        bookingAddSuccess:(state,action) =>{
            state.loading = false
            state.userBookings.push(action.payload.booking)
        },
        bookingGetSuccess:(state,action) =>{
            state.loading = false
            state.userBookings = action.payload.bookings
        },
        bookingFail:(state,action) =>{
            state.loading = false
            state.error = action.payload.message
        }
    }
    
})

export const {bookingRequest,bookingAddSuccess,bookingFail,bookingGetSuccess} = bookingSlice.actions

export default bookingSlice.reducer