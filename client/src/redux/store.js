import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/user'
import placeSlice from './reducers/place'
import bookingSlice from './reducers/booking'
export default configureStore({
  reducer: {
    user:userSlice,
    place:placeSlice,
    booking:bookingSlice
  },
})